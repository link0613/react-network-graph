# react-network-explorer
React-based network graph explorer

- Inspiration: https://kumu.io/jeff/paypal-mafia 
- Prototype: https://kumu.io/qcuk2/qcuk#qcuk-test1
- Menu and sidebar mockups: https://app.moqups.com/qcuk/kiTT1OD8fs/view 

## Main features:
- display a network graph
- user can view details of nodes and edges in a sidebar.
- There is an animation mode to zoom to different nodes and play an audio file with it.
- graph data is loaded from JSON file.
- Images hosted on S3.
- The main project parts should be reusable, so we can use any json file. Some hardcoding will be needed for the menu, but this should be limited and kept in separate files, if possible.
- Should support pretty urls to select individual nodes and show their sidebar.

## Implementation and frameworks:
For network graph:
- wrap visjs in react and redraw as needed (filter)
- circular images: http://visjs.org/examples/network/nodeStyles/circularImages.html
- pass events from visjs to vue.js eventHub: https://wipdeveloper.com/2017/03/20/using-forcejs-with-vue-js-part-iv-event-hub/
- CSS framework: http://www.material-ui.com/

### Presentation mode (plays audio and highlights nodes)
- events: http://visjs.org/examples/network/events/interactionEvents.html
- animation: http://visjs.org/examples/network/other/animationShowcase.html 
- timeline control: http://animejs.com/documentation/#TLcontrols
- or with createjs: http://www.createjs.com/docs/tweenjs/classes/Timeline.html
- looks simple as well: http://tweene.com/html/docs/#callbacks
- jQuery example: http://mediatemple.net/blog/tips/building-an-animated-web-project-using-a-javascript-timeline

## Other resources:
- Data entry for prototype: https://docs.kumu.io/guides/import.html#reserved-fields
- Simple intro: https://medium.com/basecs/a-gentle-introduction-to-graph-theory-77969829ead8
