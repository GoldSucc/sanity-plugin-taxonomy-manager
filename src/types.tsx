export interface LocalisedString {
  en: string
  nb: string
}

export interface ChildConceptTerm {
  prefLabel: LocalisedString
  id: string
  level?: number
  childConcepts?: ChildConceptTerm[]
}

export interface TopConceptTerm {
  prefLabel: LocalisedString
  id: string
  childConcepts?: ChildConceptTerm[]
}

export interface DocumentConcepts {
  topConcepts: TopConceptTerm[]
  orphans: ChildConceptTerm[]
}

export interface PrefLabelValue {
  value: string
  // eslint-disable-next-line
  renderDefault: (props: PrefLabelValue) => React.ReactElement
}

export interface ConceptDetailLinkProps {
  concept: {
    id: string
    prefLabel: string
    childConcepts?: ChildConceptTerm[]
    level?: number
  }
}
