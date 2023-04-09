[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# v-privacy
V-Privacy is a Vue 3 plugin that allows you to manage the privacy of an HTML element by blurring its content. This can be useful in scenarios where you want to hide sensitive information or content that is not relevant for the user.

## Installation

To install V-Privacy, run the following command:

```
npm install --save v-privacy
```

## Options

| Option  | Type   | Default   | Description  |
| ------- | -------- | -------- | -------- |
| Blur   | number    | 5    | The amount of blur to apply to the element.    |
| blurColor   | string    | ''    | The color of the background to be applied while blurring the element.    |
| disabledAction   | boolean    | true    | If set to true, disables any action that can be taken on the element while it's blurred.    |
| disabledScreenReader   | true    | true    | If set to true, hides the element from screen readers while it's blurred.    |
| isPrivate   | boolean    | false    | 	If set to true, applies the privacy filter to the element.    |
| isSelectable   | boolean    | false    | If set to true, allows the element to be selectable even if it's blurred.    |
| isTabbable   | boolean    | false    | If set to true, the element becomes tabbable when it's blurred.    |
| transitionDelay   | number    | 0    | The delay before the transition starts.    |
| transitionDuration   | number    | 0.2    | The duration of the transition.    |
| transitionTimingFunction   | string    | 'linear'    | The timing function of the transition.    |

## Usage

### Plugin Installation

To use V-Privacy in your Vue 3 project, you need to install it as a plugin.

```js
import { createApp } from "vue";
import VPrivacy from "v-privacy";

const app = createApp(App);

app.use(VPrivacy);
```

It is possible to provide an object to set default values (not all options are mandatory, and the ones not provided will be filled with the default values explained in Options):

```js
app.use(VPrivacy, {
    blur: 10,
    transitionDuration: 1.2,
    blurColor: '#ff0000'
  }
);
```

### Directive usage

Using the v-privacy directive with a boolean value alone allows you to use the default options. The boolean impacts the isPrivate key and enables or disables the privacy effect.

```js
<template>
  <div v-privacy="isPrivate">
    This content will be blurred for privacy reasons.
  </div>
</template>

<script setup>
   import { ref } from "vue"
   
   const isPrivate = ref(false)
</script>
```

Using the v-privacy directive with an object allows you to change the options used (not all options are mandatory, and the ones not provided will be filled with the default values explained in Options), however, the use of isPrivate within the object is mandatory to work:

```js
<template>
  <div v-privacy="{blur: 10, blurColor: '#ff0000', isPrivate: isPrivate}">
    This content will be blurred for privacy reasons.
  </div>
</template>

<script setup>
   import { ref } from "vue"
   
   const isPrivate = ref(false)
</script>
```

## Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/fchancel/v-privacy/issues) or create a pull request.

## License

V-Privacy is licensed under the MIT License. See the [LICENSE](https://github.com/fchancel/v-privacy/blob/main/LICENSE) file for more information.
