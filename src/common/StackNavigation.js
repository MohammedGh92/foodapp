import React, { PureComponent } from 'react';

import View from './View';

// TODO combine with navigation
const createStackNavigation = (screens, options) =>
  class StackNavigation extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        stack: [
          {
            name: options.initialRouteName,
            component: screens[options.initialRouteName],
            params: {},
            root: true,
          },
        ],
      };
    }

    push = (screen, params = {}) => {
      this.setState(prevState => ({
        stack: [
          ...prevState.stack,
          {
            name: screen,
            component: screens[screen],
            params,
          },
        ],
      }));
    };

    pop = () => {
      this.setState(prevState => ({
        stack: [...prevState.stack.slice(0, prevState.stack.length - 1)],
      }));
    };

    replace = () => {
      alert('replace: under development');
    };

    render() {
      return (
        <View flex stretch>
          {this.state.stack.map(screen => {
            const Screen = screen.component;

            return (
              <View
                key={screen.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <Screen
                  navigator={{
                    push: this.push,
                    pop: this.pop,
                    replace: this.replace,
                  }}
                  {...screen.params}
                />
              </View>
            );
          })}
        </View>
      );
    }
  };

export default createStackNavigation;
