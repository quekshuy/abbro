abbro
=====

A Javascript library for A/B testing integration with Segment.io and Mixpanel

Quickstart
=====

This module is not AMD loadable as of now. Just a draft.

Modelled after Abba, Stripe's A/B Testing tool.

To use:

```
Abbro('New button')
    .control('Red button', function() {
        /* setup red button UI */
    })
    .variation('Green button', function() {
        /* setup blue button UI */
    })
    .variation('Blue button', function() {
        /* setup green button UI */
    })
    .start();

```
