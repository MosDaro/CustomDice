import React, { Component } from "react";

const Context = React.createContext();

class Provider extends Component {
  state = {
    page: "landing",
    options: {},
  };

  changePage = page => {
    this.setState({ page });
  };

  setOptions = options => {
    Object.keys(options).forEach(
      k => !options[k] && options[k] !== undefined && delete options[k]
    );

    this.setState({ options });
  };

  render() {
    return (
      <>
        <Context.Provider
          value={{
            state: this.state,
            changePage: this.changePage,
            setOptions: this.setOptions,
          }}
        >
          {this.props.children}
        </Context.Provider>
      </>
    );
  }
}

export { Provider, Context };
