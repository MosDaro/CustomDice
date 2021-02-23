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
    if (options) {
      Object.keys(options).forEach(k => {
        !options[k] && options[k] !== undefined && delete options[k];
        this.setState({
          options: {
            ...this.state.options,
            [options[k][0]]: options[k][1],
          },
        });
      });
    }
  };

  addOption = (name, option) => {
    this.setState({
      options: {
        ...this.state.options,
        [name]: option,
      },
    });
    this.setDropdownPick(name);
  };

  deleteOption = name => {
    let options = { ...this.state.options };
    delete options[name];
    this.setState({ options });

    this.setDropdownPick(null);
    // console.log(name);
    // this.setState({
    //   options: {
    //     ...this.state.options,
    //     [name]: undefined,
    //   },
    // });
    // console.log(this.state.options);
  };

  setDropdownPick = option => {
    if (option === "new") {
      this.changePage("diceSet");
      this.setState({ dropdownPick: null });
    } else this.setState({ dropdownPick: option });
  };

  render() {
    return (
      <>
        <Context.Provider
          value={{
            state: this.state,
            changePage: this.changePage,
            setOptions: this.setOptions,
            addOption: this.addOption,
            setDropdownPick: this.setDropdownPick,
            deleteOption: this.deleteOption,
          }}
        >
          {this.props.children}
        </Context.Provider>
      </>
    );
  }
}

export { Provider, Context };
