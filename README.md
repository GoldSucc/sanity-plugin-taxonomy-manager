# Sanity Plugin Taxonomy Manager
![NPM Version](https://img.shields.io/npm/v/sanity-plugin-taxonomy-manager?style=flat-square)
![License](https://img.shields.io/npm/l/sanity-plugin-taxonomy-manager?style=flat-square)

### Create and manage [SKOS](https://www.w3.org/TR/skos-primer/) compliant taxonomies, thesauri, and classification schemes in Sanity Studio.

Taxonomies are crucial tools for organization and interoperability between and across data sets. Taxonomy Manager provides a way for content authors to create, use, and maintain standards compliant taxonomies in Sanity Studio. 

The Taxonomy Manager document schema is based on the [World Wide Web Consortium](https://www.w3.org/) (W3C) [Simple Knowledge Organization Scheme](https://www.w3.org/TR/skos-reference/) (SKOS) recommendation. Concept and concept scheme editor tools include standard SKOS properties, brief hints for creating consistent concepts and vocabularies, and validation functions for preventing consistency errors. 

### SKOS Broader and Related Concepts

The concept editor includes filtering and validation to help you create consistent SKOS vocabularies. Adding the same concept to Broader and Related fields is not allowed, and the editor validates disjunction of Related concepts with Broader Transitive up to five hierarchical levels in either direction. 

<img src="https://user-images.githubusercontent.com/3710835/159759995-180cbbf0-e348-4673-90af-f32062924216.png" width="700">

### Preferred, Alternative, and Hidden Labels

Preferred Labels are validated for uniqueness across concepts, and Preferred, Alternative, and Hidden are validated to prevent duplicates and overlap. 

<img src="https://user-images.githubusercontent.com/3710835/159759929-cd0ff6a7-31d5-47f0-bcc7-429d05922866.png" width="700">

### Scope Notes, Definition, and Examples

Standard optional SKOS documentation fields are included by default.

<img src="https://user-images.githubusercontent.com/3710835/159759952-50097112-2d80-43d3-ba50-545956e3b2ea.png" width="700">

### Support for Single or Multiple Taxonomy Schemes (or none)

For cases where more than one taxonomy is needed, multiple [SKOS Concept Schemes](https://www.w3.org/TR/skos-reference/#schemes) are supported. Schemes can be used to configure filtered views of concepts in [Sanity Structure Builder](https://www.sanity.io/docs/structure-builder-introduction), and will provide for additional filtering and view options in [future versions of Taxonomy Manager](README.md#to-do). 

<img src="https://user-images.githubusercontent.com/3710835/173248197-afcd1718-8aaa-4925-b2ea-f21f1a16a497.png" width="700">

Taxonomy Scheme views show a hierarchical list (Tree View) of the concepts included in a given scheme. This list allows for easy visualization of Top Concepts and polyhierarchy (concepts that appear in more than one place in the hierarchy). "Orphan" terms can be identified by looking for top level concepts not denoted as a Top Concept.

## Features

- Adds two document types to your Sanity schema which are used to generate SKOS compliant concepts and concept schemes: `skosConcept` and `skosConceptScheme`
- Pre-populates [base URI](https://www.w3.org/TR/skos-primer/#secconcept) and [concept scheme](https://www.w3.org/TR/skos-primer/#secscheme) values for new concepts
- Validates [disjunction between Broader and Related relationships](https://www.w3.org/TR/skos-reference/#L2422)
- Validates [disjunction between Preferred and Alternate/Hidden labels](https://www.w3.org/TR/skos-reference/#L1567)

## Installation

Install using the [Sanity CLI](https://www.sanity.io/docs/cli).

```bash
$ sanity install taxonomy-manager
```
## Configuration

Configure your [concept namespace](https://www.w3.org/TR/skos-primer/#secconcept) in `<your-studio-folder>/config/taxonomy-manager.json`:

```json
{
  "namespace": "http://example.com/"
}
```

This namespace defines the base URI for your concepts and concept schemes. The W3C recommends the use of HTTP URIs when minting concept URIs since they are resolvable to representations that can be accessed using standard Web technologies. For more information about URIs on the Semantic Web, see [Cool URIs for the Semantic Web](https://www.w3.org/TR/2008/NOTE-cooluris-20081203/) and [Best Practice Recipes for Publishing RDF Vocabularies](https://www.w3.org/TR/2008/NOTE-swbp-vocab-pub-20080828/).

You can use [Structure Builder](https://www.sanity.io/docs/structure-builder-reference) to create a separate area for your taxonomy tools.

```js
const hiddenDocTypes = (listItem) =>
!['skosConcept', 'skosConceptScheme'].includes(
  listItem.getId()
)

export default () =>
  // ... other structure builder items
  S.divider(),
  S.documentTypeListItem("skosConcept").title("Concepts"),
  S.documentTypeListItem("skosConceptScheme").title("Taxonomy Schemes"),
  S.divider(),
  // ... other structure builder items
``` 

## Usage

1. Set your taxonomy bases IRI in the `namespace` field of the configuration file. 
2. Create a [Concept Scheme](https://www.w3.org/TR/skos-reference/#schemes) to group related concepts (optional)
3. Create and describe Concepts.
    - All fields _except_ PrefLabel are optional, and are to be used as best fits the needs of your information modeling task.
    - All Concept fields map to elements of the machine readable data model described in the [W3C SKOS Recommendation](https://www.w3.org/TR/skos-reference/).
4. Tag resources with concepts and then integrate into search indexing, navigation, and semantic web services.
    - 👉 Examples to come!

<!-- 
Future "usage" notes:
- Set above as "basic usage"
- Single taxonomy
- Multiple taxonomies
- Faceted Schemes
– Thesauri
 -->


## [SKOS Overview](https://www.w3.org/TR/skos-reference/)

> The Simple Knowledge Organization System (SKOS) is a common data model for sharing and linking knowledge organization systems via the Web.
>
> Many knowledge organization systems, such as thesauri, taxonomies, classification schemes and subject heading systems, share a similar structure, and are used in similar applications. SKOS captures much of this similarity and makes it explicit, to enable data and technology sharing across diverse applications.
>
> The SKOS data model provides a standard, low-cost migration path for porting existing knowledge organization systems to the Semantic Web. SKOS also provides a lightweight, intuitive language for developing and sharing new knowledge organization systems. It may be used on its own, or in combination with formal knowledge representation languages such as the Web Ontology language (OWL).

## To Do

- [ ] Move document level validation to individual fields
- [ ] Add extended disjunction validation for broaderTransitive/Related concepts
- [ ] Add language and country tags to support internationalization, adjust PrefLabel uniqueness rules
- [ ] Add implementation examples for single and multiple hierarchical schemes, faceted classification, and thesauri
- [ ] Add "Export as Turtle File" to `skosConceptScheme` type
- [ ] Add functionality to import from .csv and/or .ttl

## To Done

- [x] Create taxonomy tree view custom input template for `skosConceptScheme` [2022-06-12]


## License

MIT © Andy Fitzgerald
See LICENSE
