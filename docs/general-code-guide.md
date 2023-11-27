# General Code Guide
This guide contains assumptions we'll be making with regards to the code written in this repo.

### Assumptions
- Keep functions, components, and types close to where they're being used. When it is used elsewhere move it to the nearest umbrella module. ie.
    * *./src/features/[**featureName**]*: when it's being used in another page/component inside the same feature.
    * *./src/*: when it's being used in another feature, or in the src folder.