# adapt-animation-hotspot  

<img src="assets/animation-hotspot.gif" alt="animation-hotspot" align="right" height="400px">

Component having hotspots over the images that enables learner display a detailed popup.

### Installation
First, be sure to install the [Adapt Command Line Interface](https://github.com/cajones/adapt-cli), then from the command line run:-

    adapt install animation-hotspot

Or, download the ZIP and extract into the src > extensions directory and run an appropriate Grunt task.

### Demo

https://kunjsharma.github.io/#/id/co-00

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**_component** (string): This value must be: `animation-hotspot`.

**_animation** (boolean): Animation required or not.

**_delay** (string): Time interval between frames (ms).

**_navigation** (string): linear or random.

**_bg** (string): Background image. Required to display component correctly in responsive.

**_items** (array): Contains values for **_graphic** and **_highlight** for each animation frame.

**_hotspots** (array): Sets dimension, position, border radius and label.

**_feedback** (array): Notify popup text (opens when click on hotspot).

### Limitations

Compatiblity issue with authoring tool, ok with framework.

### Browser/platform specification

Intended to develop standard Adapt browser/devices specifications.

----------------------------
**Version number:**  2.0.2  
**Framework versions:** ^2.0.3  
**Accessibility support:** WAI AA  
**Author/maintainer:** Kunj B Sharma <kunjsharma@hotmail.com>  
