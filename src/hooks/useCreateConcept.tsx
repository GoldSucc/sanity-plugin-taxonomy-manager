/**
 * Concept Creation Hook
 * Used for creating concepts and top concepts from the Concept Scheme
 * hierarchy view.
 * @todo type document, likely via extended SanityDocument type.
 */

import {useClient} from 'sanity'
import {useToast} from '@sanity/ui'
import {useCallback} from 'react'
import {randomKey} from '@sanity/util/content'
import {useOpenNewConceptPane} from './useOpenNewConceptPane'

export function useCreateConcept(document: any) {
  const toast = useToast()
  const client = useClient({apiVersion: '2021-10-21'})
  const openInNewPane = useOpenNewConceptPane()

  const documentId = document.displayed._id // schema id
  const schemaBaseIri = document.displayed.baseIri // schema baseIri

  const createConcept = useCallback(
    (conceptType: string, conceptId?: string, prefLabel?: string) => {
      let skosConcept: any
      if (conceptId) {
        skosConcept = {
          _id: `${randomKey()}`,
          _type: 'skosConcept',
          conceptId: `${randomKey(6)}`,
          prefLabel: '',
          baseIri: schemaBaseIri,
          broader: [
            conceptId && {
              _key: randomKey(6),
              _ref: conceptId,
              _type: 'reference',
            },
          ],
          related: [],
        }
      } else {
        skosConcept = {
          _id: `${randomKey()}`,
          _type: 'skosConcept',
          conceptId: `${randomKey(6)}`,
          prefLabel: '',
          baseIri: schemaBaseIri,
          broader: [],
          related: [],
        }
      }

      client
        .transaction()
        .create(skosConcept)
        .patch(documentId, (patch) => {
          if (conceptType == 'topConcept') {
            return patch
              .setIfMissing({topConcepts: []})
              .append('topConcepts', [{_ref: skosConcept._id, _type: 'reference'}])
          }
          return patch
            .setIfMissing({concepts: []})
            .insert('after', 'concepts[-1]', [{_ref: skosConcept._id, _type: 'reference'}])
        })
        .commit({autoGenerateArrayKeys: true})
        .then((res) => {
          toast.push({
            closable: true,
            status: 'success',
            title: 'Created new concept',
          })
          openInNewPane(skosConcept._id)
        })
        .catch((err) => {
          toast.push({
            closable: true,
            status: 'error',
            title: 'Error creating concept',
            description: err.message,
          })
        })
    },
    [schemaBaseIri, toast, client, documentId, openInNewPane]
  )
  return createConcept
}
