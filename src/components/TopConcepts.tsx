/**
 * Top Concept Component
 * Renders a list of top concepts for a given schema.
 * @todo consider modularizing add and remove buttons
 */

import {useCallback, useContext, useState} from 'react'
import {Box, Inline, Stack, Text, Tooltip} from '@sanity/ui'
import {AddCircleIcon, SquareIcon, ToggleArrowRightIcon, TrashIcon} from '@sanity/icons'
import {useCreateConcept, useRemoveConcept} from '../hooks'
import {TopConceptTerm} from '../types'
import {StyledTopConcept, StyledTreeButton, StyledTreeToggle} from '../styles'
import {SchemeContext} from './TreeView'
import {ChildConcepts} from './ChildConcepts'
import {ConceptDetailLink} from './ConceptDetailLink'
import {ConceptDetailDialogue} from './ConceptDetailDialogue'

type TopConceptsProps = {
  concept: TopConceptTerm
  treeVisibility: string
}

export const TopConcepts = ({concept, treeVisibility}: TopConceptsProps) => {
  const document: any = useContext(SchemeContext) || {}
  const createConcept = useCreateConcept(document)
  const removeConcept = useRemoveConcept(document)

  const [levelVisibility, setLevelVisibility] = useState(treeVisibility)

  const handleToggle = useCallback(() => {
    if (levelVisibility == 'open') {
      setLevelVisibility('closed')
    } else if (levelVisibility == 'closed') {
      setLevelVisibility('open')
    }
  }, [levelVisibility])

  const handleAddChild = useCallback(() => {
    createConcept('concept', concept?.id, concept?.prefLabel.en)
  }, [concept?.id, concept?.prefLabel, createConcept])

  const handleRemoveConcept = useCallback(() => {
    removeConcept(concept?.id, 'topConcept', concept?.prefLabel.en)
  }, [concept?.id, concept?.prefLabel, removeConcept])

  return (
    <StyledTopConcept className={levelVisibility}>
      <Inline space={2}>
        <Inline space={0}>
          {concept?.childConcepts && concept.childConcepts.length > 0 && (
            <StyledTreeToggle
              onClick={handleToggle}
              type="button"
              aria-expanded={levelVisibility == 'open'}
            >
              <ToggleArrowRightIcon />
            </StyledTreeToggle>
          )}
          {concept?.childConcepts && concept.childConcepts.length == 0 && (
            <SquareIcon className="spacer" />
          )}
          {!concept?.prefLabel && <span className="untitled">[new concept]</span>}
          <ConceptDetailLink concept={concept} />
        </Inline>
        <Text size={1} muted>
          top concept
        </Text>
        {!document.displayed?.controls && <ConceptDetailDialogue concept={concept} />}
        {document.displayed?.controls && (
          <Inline space={2}>
            <Tooltip
              content={
                <Box padding={2} sizing="border">
                  <Stack padding={1} space={2}>
                    <Text muted size={1}>
                      Add a child concept
                    </Text>
                  </Stack>
                </Box>
              }
              fallbackPlacements={['right', 'left']}
              placement="top"
            >
              <StyledTreeButton
                onClick={handleAddChild}
                type="button"
                className="action"
                aria-label="Add child a child concept"
              >
                <AddCircleIcon className="add" />
              </StyledTreeButton>
            </Tooltip>
            <Tooltip
              content={
                <Box padding={2} sizing="border">
                  <Stack padding={1} space={2}>
                    <Text muted size={1}>
                      Remove concept from scheme
                    </Text>
                  </Stack>
                </Box>
              }
              fallbackPlacements={['right', 'left']}
              placement="top"
            >
              <StyledTreeButton
                onClick={handleRemoveConcept}
                type="button"
                className="action"
                aria-label="Remove concept from scheme"
              >
                <TrashIcon className="remove" />
              </StyledTreeButton>
            </Tooltip>
          </Inline>
        )}
      </Inline>
      {concept?.childConcepts && concept.childConcepts.length > 0 && (
        <ChildConcepts concepts={concept.childConcepts} />
      )}
    </StyledTopConcept>
  )
}
