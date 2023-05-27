/**
 * Child Concepts
 * This component renders a list of child concepts for a given concept.
 */

import {StyledChildConcepts} from '../styles'
import {ChildConceptTerm} from '../types'
import {Children} from './Children'

export const ChildConcepts = ({concepts}: {concepts: ChildConceptTerm[]}) => {
  return (
    <StyledChildConcepts>
      {concepts.map((concept: any) => (
        <Children key={concept.id} concept={concept} />
      ))}
    </StyledChildConcepts>
  )
}
