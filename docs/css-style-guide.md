# Style Guide

Here are some basic rules to improve consistency in the decisions made by the various developers.

## Component Naming

Components should be grouped in a folder with CamelCase naming.
```
📂 Button
   |- Button.jsx
   |- Button.module.scss
   |- index.js
```

## CSS Modules Class Naming

BEM (Block Element Modifier) but with camelCasing.
```scss
// ✅ Prefer
.aboutSection {
  &__title {}
  &__titleIcon {
    &_withBorder {}
  }
}

// ✅ Or
.aboutSection {}
.aboutSection__title {}
.aboutSection__titleIcon {}
.aboutSection__titleIcon_withBorder {}

// 🚫 Over
.about-section {}
.about-section__title {}
.about-section__title-icon {}
.aboutSection__title-icon--with-border {}
```

> Motivation: eliminating the `-` character allows us to use names exports to import classes
```JavaScript
import {
  aboutSection, 
  aboutSection__title,
  aboutSection__titleIcon,
  aboutSection__titleIcon_withBorder
} from './AboutSection.module.scss'

// ...
```
> Or to use dot notation to access classnames
```JavaScript
import styles from './AboutSection.module.scss'

function AboutSection() {
  return <div className={styles.aboutSection}>
    <h1 className={styles.aboutSection__title}></h1>
  </div>
}
// ...
```
> Both of which would not be possible if class names contain `-` character

## Testing - Unit Tests

Tests should be grouped for each modules under a `__tests__` folder.

```
📂 components
  |- 📂 __tests__
    |- Button.test.js
📂 utils
  |- 📂 __tests__
    |- string-helper.test.js
```
