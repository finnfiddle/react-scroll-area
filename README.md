# React Scroll Area

```bash
npm install react-scroll-area
```

A React component that enables you to programmatically scroll to child components within it.

## Example Usage

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScrollArea from 'react-scroll-area';

class MyComponent extends Component {

  componentDidMount() {
    const scrollarea = ReactDOM.findDOMNode(this.refs.scrollarea);

    setTimeout(() => {
      scrollarea.scrollTo(this.refs.first_target);
    }, 3000);

    setTimeout(() => {
      scrollarea.scrollTo(this.refs.second_target, {
        offsetTop: -100,
        offsetLeft: 0,
        duration: 2000,
        delay: 500,
        tick: 50,
      });
    }, 6000);
  }

  render() {
    return (
      <ScrollArea style={{width: 400, height: 400}} ref='scrollarea'>
        <h2 ref="first_target" style={{marginBottom: 500}}>First Target</h2>
        <h2 ref="second_target">Second Target</h2>
      </ScrollArea>
    );
  }
}

```

## Options

Passed as second argument to `scrollTo` method.

| Prop Name  | Description                                                                | Default Value |
|------------|----------------------------------------------------------------------------|---------------|
| offsetTop  | desired vertical offset of scroll container from target at end of scroll   | 0             |
| offsetLeft | desired horizontal offset of scroll container from target at end of scroll | 0             |
| duration   | duration of scroll                                                         | 200           |
| delay      | delay before starting to scroll                                            | 0             |
| tick       | period between each tick of scroll animation                               | 30            |

## License

MIT
