---
description: daisyUI 5 documentation and usage guidelines.
applyTo: '**/*.tsx,src/global.css,default.config.yaml'
---

# daisyUI 5

daisyUI 5 is a CSS library for Tailwind CSS 4
daisyUI 5 provides class names for common UI components

- [daisyUI 5 docs](http://daisyui.com)

## daisyUI 5 usage rules

1. ALWAYS use [@kokimoki/shared](./kokimoki-shared.instructions.md) components over daisyUI components FIRST if they exist
2. ALWAYS prioritize daisyUI class components over writing custom CSS or Tailwind CSS utility classes
3. We can give styles to a HTML element by adding daisyUI class names to it. By adding a component class name, part class names (if there's any available for that component), and modifier class names (if there's any available for that component)
4. Components can be customized using Tailwind CSS utility classes if the customization is not possible using the existing daisyUI classes. For example `btn px-10` sets a custom horizontal padding to a `btn`
5. If customization of daisyUI styles using Tailwind CSS utility classes didn't work because of CSS specificity issues, you can use the `!` at the end of the Tailwind CSS utility class to override the existing styles. For example `btn bg-red-500!` sets a custom background color to a `btn` forcefully. This is a last resort solution and should be used sparingly
6. If a specific component or something similar to it doesn't exist in daisyUI, you can create your own component using Tailwind CSS utility
7. when using Tailwind CSS `flex` and `grid` for layout, it should be responsive using Tailwind CSS responsive utility prefixes.
8. Only allowed class names are existing daisyUI class names or Tailwind CSS utility classes.
9. Ideally, you won't need to write any custom CSS. Using daisyUI class names or Tailwind CSS utility classes is preferred.
10. suggested - if you need placeholder images, use <https://picsum.photos/200/300> with the size you want
11. suggested - when designing , don't add a custom font unless it's necessary
12. don't add `bg-base-100 text-base-content` to body unless it's necessary
13. For design decisions, use Refactoring UI book best practices

daisyUI 5 class names are one of the following categories. these type names are only for reference and are not used in the actual code

- `component`: the required component class
- `part`: a child part of a component
- `style`: sets a specific style to component or part
- `behavior`: changes the behavior of component or part
- `color`: sets a specific color to component or part
- `size`: sets a specific size to component or part
- `placement`: sets a specific placement to component or part
- `direction`: sets a specific direction to component or part
- `modifier`: modifies the component or part in a specific way

## daisyUI 5 colors

### daisyUI color names

- `primary`: Primary brand color, The main color of your brand
- `primary-content`: Foreground content color to use on primary color
- `secondary`: Secondary brand color, The optional, secondary color of your brand
- `secondary-content`: Foreground content color to use on secondary color
- `accent`: Accent brand color, The optional, accent color of your brand
- `accent-content`: Foreground content color to use on accent color
- `neutral`: Neutral dark color, For not-saturated parts of UI
- `neutral-content`: Foreground content color to use on neutral color
- `base-100`:-100 Base surface color of page, used for blank backgrounds
- `base-200`:-200 Base color, darker shade, to create elevations
- `base-300`:-300 Base color, even more darker shade, to create elevations
- `base-content`: Foreground content color to use on base color
- `info`: Info color, For informative/helpful messages
- `info-content`: Foreground content color to use on info color
- `success`: Success color, For success/safe messages
- `success-content`: Foreground content color to use on success color
- `warning`: Warning color, For warning/caution messages
- `warning-content`: Foreground content color to use on warning color
- `error`: Error color, For error/danger/destructive messages
- `error-content`: Foreground content color to use on error color

### daisyUI color rules

1. daisyUI adds semantic color names to Tailwind CSS colors
2. daisyUI color names can be used in utility classes, like other Tailwind CSS color names. for example, `bg-primary` will use the primary color for the background
3. daisyUI color names include variables as value so they can change based the theme
4. There's no need to use `dark:` for daisyUI color names
5. Ideally only daisyUI color names should be used for colors so the colors can change automatically based on the theme
6. If a Tailwind CSS color name (like `red-500`) is used, it will be same red color on all themes
7. If a daisyUI color name (like `primary`) is used, it will change color based on the theme
8. Using Tailwind CSS color names for text colors should be avoided because Tailwind CSS color `text-gray-800` on `bg-base-100` would be unreadable on a dark theme - because on dark theme, `bg-base-100` is a dark color
9. `*-content` colors should have a good contrast compared to their associated colors
10. suggestion - when designing a page use `base-*` colors for majority of the page. use `primary` color for important elements

### daisyUI theme with custom colors

- IMPORTANT! Do not modify directly [daisyui.css](../../src/daisyui.css), Use [default.config.yaml](../../default.config.yaml) to modify theme colors by variables

#### Example

A CSS file with Tailwind CSS, daisyUI and a custom daisyUI theme

```css
@plugin 'daisyui' {
 logs: false;
 themes: light --default;
}

@plugin "daisyui/theme" {
 name: 'lobby-theme';
 default: false;
 prefersdark: false;
 color-scheme: 'light';
 --color-base-100: var(--km-color-base-100);
 --color-base-200: var(--km-color-base-200);
 --color-base-300: var(--km-color-base-300);
 --color-base-content: var(--km-color-base-content);
 --color-primary: var(--km-color-primary);
 --color-primary-content: var(--km-color-primary-content);
 --color-secondary: var(--km-color-secondary);
 --color-secondary-content: var(--km-color-secondary-content);
 --color-accent: var(--km-color-accent);
 --color-accent-content: var(--km-color-accent-content);
 --color-neutral: var(--km-color-neutral);
 --color-neutral-content: var(--km-color-neutral-content);
 --color-info: var(--km-color-info);
 --color-info-content: var(--km-color-info-content);
 --color-success: var(--km-color-success);
 --color-success-content: var(--km-color-success-content);
 --color-warning: var(--km-color-warning);
 --color-warning-content: var(--km-color-warning-content);
 --color-error: var(--km-color-error);
 --color-error-content: var(--km-color-error-content);
 --radius-selector: var(--km-radius-selector);
 --radius-field: var(--km-radius-field);
 --radius-box: var(--km-radius-box);
 --size-selector: var(--km-size-selector);
 --size-field: var(--km-size-field);
 --border: var(--km-border);
 --depth: var(--km-depth);
 --noise: var(--km-noise);
}
```

## daisyUI 5 components

### alert

Alert informs users about important events

[alert docs](https://daisyui.com/components/alert/)

#### Class names

- component: `alert`
- style: `alert-outline`, `alert-dash`, `alert-soft`
- color: `alert-info`, `alert-success`, `alert-warning`, `alert-error`
- direction: `alert-vertical`, `alert-horizontal`

#### Syntax

```html
<div role="alert" class="alert {MODIFIER}">{CONTENT}</div>
```

#### Rules

- {MODIFIER} is optional and can have one of each style/color/direction class names
- Add `sm:alert-horizontal` for responsive layouts

### badge

Badges are used to inform the user of the status of specific data

[badge docs](https://daisyui.com/components/badge/)

#### Class names

- component: `badge`
- style: `badge-outline`, `badge-dash`, `badge-soft`, `badge-ghost`
- color: `badge-neutral`, `badge-primary`, `badge-secondary`, `badge-accent`, `badge-info`, `badge-success`, `badge-warning`, `badge-error`
- size: `badge-xs`, `badge-sm`, `badge-md`, `badge-lg`, `badge-xl`

#### Syntax

```html
<span class="badge {MODIFIER}">Badge</span>
```

#### Rules

- {MODIFIER} is optional and can have one of each style/color/size class names
- Can be used inside text or buttons
- To create an empty badge, just remove the text between the span tags

### button

Buttons allow the user to take actions

[button docs](https://daisyui.com/components/button/)

#### Class names

- component: `btn`
- color: `btn-neutral`, `btn-primary`, `btn-secondary`, `btn-accent`, `btn-info`, `btn-success`, `btn-warning`, `btn-error`
- style: `btn-outline`, `btn-dash`, `btn-soft`, `btn-ghost`, `btn-link`
- behavior: `btn-active`, `btn-disabled`
- size: `btn-xs`, `btn-sm`, `btn-md`, `btn-lg`, `btn-xl`
- modifier: `btn-wide`, `btn-block`, `btn-square`, `btn-circle`

#### Syntax

```html
<button class="btn {MODIFIER}">Button</button>
```

#### Rules

- {MODIFIER} is optional and can have one of each color/style/behavior/size/modifier class names
- btn can be used on any html tags such as `<button>`, `<a>`, `<input>`
- btn can have an icon before or after the text
- set `tabindex="-1" role="button" aria-disabled="true"` if you want to disable the button using a class name

### card

Cards are used to group and display content

[card docs](https://daisyui.com/components/card/)

#### Class names

- component: `card`
- part: `card-title`, `card-body`, `card-actions`
- style: `card-border`, `card-dash`
- modifier: `card-side`, `image-full`
- size: `card-xs`, `card-sm`, `card-md`, `card-lg`, `card-xl`

#### Syntax

```html
<div class="card {MODIFIER}">
 <figure><img src="{image-url}" alt="{alt-text}" /></figure>
 <div class="card-body">
  <h2 class="card-title">{title}</h2>
  <p>{CONTENT}</p>
  <div class="card-actions">{actions}</div>
 </div>
</div>
```

#### Rules

- {MODIFIER} is optional and can have one of the modifier class names and one of the size class names
- `<figure>` and `<div class="card-body">` are optional
- can use `sm:card-horizontal` for responsive layouts
- If image is placed after `card-body`, the image will be placed at the bottom

### checkbox

Checkboxes are used to select or deselect a value

[checkbox docs](https://daisyui.com/components/checkbox/)

#### Class names

- component: `checkbox`
- color: `checkbox-primary`, `checkbox-secondary`, `checkbox-accent`, `checkbox-neutral`, `checkbox-success`, `checkbox-warning`, `checkbox-info`, `checkbox-error`
- size: `checkbox-xs`, `checkbox-sm`, `checkbox-md`, `checkbox-lg`, `checkbox-xl`

#### Syntax

```html
<input type="checkbox" class="checkbox {MODIFIER}" />
```

#### Rules

- {MODIFIER} is optional and can have one of each color/size class names

### dropdown

Dropdown can open a menu or any other element when the button is clicked

[dropdown docs](https://daisyui.com/components/dropdown/)

#### Class names

- component: `dropdown`
- part: `dropdown-content`
- placement: `dropdown-start`, `dropdown-center`, `dropdown-end`, `dropdown-top`, `dropdown-bottom`, `dropdown-left`, `dropdown-right`
- modifier: `dropdown-hover`, `dropdown-open`

#### Syntax

Using details and summary

```html
<details class="dropdown">
 <summary>Button</summary>
 <ul class="dropdown-content">
  {CONTENT}
 </ul>
</details>
```

Using popover API

```html
<button popovertarget="{id}" style="anchor-name:--{anchor}">{button}</button>
<ul
 class="dropdown-content"
 popover
 id="{id}"
 style="position-anchor:--{anchor}"
>
 {CONTENT}
</ul>
```

Using CSS focus

```html
<div class="dropdown">
 <div tabindex="0" role="button">Button</div>
 <ul tabindex="0" class="dropdown-content">
  {CONTENT}
 </ul>
</div>
```

#### Rules

- {MODIFIER} is optional and can have one of the modifier/placement class names
- replace `{id}` and `{anchor}` with a unique name
- For CSS focus dropdowns, use `tabindex="0"` and `role="button"` on the button
- The content can be any HTML element (not just `<ul>`)

### input

Text Input is a simple input field

[input docs](https://daisyui.com/components/input/)

#### Class names

- component: `input`
- style: `input-ghost`
- color: `input-neutral`, `input-primary`, `input-secondary`, `input-accent`, `input-info`, `input-success`, `input-warning`, `input-error`
- size: `input-xs`, `input-sm`, `input-md`, `input-lg`, `input-xl`

#### Syntax

```html
<input type="{type}" placeholder="Type here" class="input {MODIFIER}" />
```

#### Rules

- {MODIFIER} is optional and can have one of each style/color/size class names
- Can be used with any input field type (text, password, email, etc.)
- Use `input` class for the parent when you have more than one element inside input

### label

Label is used to provide a name or title for an input field. Label can be placed before or after the field

[label docs](https://daisyui.com/components/label/)

#### Class names

- component: `label`, `floating-label`

#### Syntax

For regular label:

```html
<label class="input">
 <span class="label">{label text}</span>
 <input type="text" placeholder="Type here" />
</label>
```

For floating label:

```html
<label class="floating-label">
 <input type="text" placeholder="Type here" class="input" />
 <span>{label text}</span>
</label>
```

#### Rules

- The `input` class is for styling the parent element which contains the input field and label, so the label does not have the 'input' class
- Use `floating-label` for the parent of an input field and a span that floats above the input field when the field is focused

### loading

Loading shows an animation to indicate that something is loading

[loading docs](https://daisyui.com/components/loading/)

#### Class names

- component: `loading`
- style: `loading-spinner`, `loading-dots`, `loading-ring`, `loading-ball`, `loading-bars`, `loading-infinity`
- size: `loading-xs`, `loading-sm`, `loading-md`, `loading-lg`, `loading-xl`

#### Syntax

```html
<span class="loading {MODIFIER}"></span>
```

#### Rules

- {MODIFIER} is optional and can have one of the style/size class names

### menu

Menu is used to display a list of links vertically or horizontally

[menu docs](https://daisyui.com/components/menu/)

#### Class names

- component: `menu`
- part: `menu-title`, `menu-dropdown`, `menu-dropdown-toggle`
- modifier: `menu-disabled`, `menu-active`, `menu-focus`, `menu-dropdown-show`
- size: `menu-xs`, `menu-sm`, `menu-md`, `menu-lg`, `menu-xl`
- direction: `menu-vertical`, `menu-horizontal`

#### Syntax

Vertical menu:

```html
<ul class="menu">
 <li><button>Item</button></li>
</ul>
```

Horizontal menu:

```html
<ul class="menu menu-horizontal">
 <li><button>Item</button></li>
</ul>
```

#### Rules

- {MODIFIER} is optional and can have one of the modifier/size/direction class names
- Use `lg:menu-horizontal` for responsive layouts
- Use `menu-title` for list item title
- Use `<details>` tag to make submenus collapsible
- Use `menu-dropdown` and `menu-dropdown-toggle` to toggle the dropdown using JS

### navbar

Navbar is used to show a navigation bar on the top of the page

[navbar docs](https://daisyui.com/components/navbar/)

#### Class names

- component: `navbar`
- part: `navbar-start`, `navbar-center`, `navbar-end`

#### Syntax

```html
<div class="navbar">{CONTENT}</div>
```

#### Rules

- use `navbar-start`, `navbar-center`, `navbar-end` to position content horizontally
- put anything inside each section
- suggestion - use `base-200` for background color

### radio

Radio buttons allow the user to select one option

[radio docs](https://daisyui.com/components/radio/)

#### Class names

- component: `radio`
- color: `radio-neutral`, `radio-primary`, `radio-secondary`, `radio-accent`, `radio-success`, `radio-warning`, `radio-info`, `radio-error`
- size: `radio-xs`, `radio-sm`, `radio-md`, `radio-lg`, `radio-xl`

#### Syntax

```html
<input type="radio" name="{name}" class="radio {MODIFIER}" />
```

#### Rules

- {MODIFIER} is optional and can have one of the size/color class names
- Replace {name} with a unique name for the radio group
- Each set of radio inputs should have unique `name` attributes to avoid conflicts with other sets of radio inputs on the same page

## All other components

### Components not included in this guide

- accordion
- avatar
- breadcrumbs
- calendar
- carousel
- chat
- collapse
- countdown
- diff
- divider
- dock
- drawer
- fab (floating action button)
- fieldset
- file-input
- filter
- footer
- hero
- hover-gallery
- indicator
- join
- kbd (keyboard)
- link
- list
- mask
- mockup-browser
- mockup-code
- mockup-phone
- mockup-window
- modal
- pagination
- progress
- radial-progress
- range
- rating
- select
- skeleton
- stack
- stat
- status
- steps
- swap
- tab
- table
- textarea
- theme-controller
- timeline
- toast
- toggle
- validator

For documentation on all other daisyUI components, check [docs](https://daisyui.com/llms.txt)
