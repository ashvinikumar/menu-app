import React, { Component } from 'react';
import './App.css';

import Category from './components/Category/Category';
import Detail from './components/Detail/Detail';
import Cart from './components/Cart/Cart';

import axios from 'axios';

class App extends Component {
  state = {
    menus: [],
    uniqueCategory: [],
    itemCount: 0
  };

  componentDidMount() {
    axios
      .get("https://api.myjson.com/bins/o9p5y")
      .then(response => {
        const newMenus = response.data.map(m => {
          return {
            availabletime: m.availabletime,
            category: m.category,
            description: m.description,
            name: m.name,
            price: m.price,
            vegflag: m.vegflag
          };
        });

        const newState = Object.assign({}, this.state, {
          menus: newMenus
        });
        this.setState(newState);

        const uniqueCategorys = [];
        this.state.menus.map(cat => {
          if (uniqueCategorys.indexOf(cat.category) === -1) {
            uniqueCategorys.push(cat.category)
          }
        });

        const newState2 = Object.assign({}, this.state, {
          uniqueCategory: uniqueCategorys
        });

        this.setState(newState2);
      })
      .catch(error => console.log(error));
  }

  removeItemHandler = () => {
    console.log("item removed");
  }

  AddItemHandler = () => {
    console.log("item added");

    this.setState({
      itemCount: this.state.itemCount + 1
    });
  }

  render() {


    // const ChineseCombos = this.state.menus.filter((cate) => cate.category === "Chinese Combos");
    // console.log(ChineseCombos);


    // const newMenuObject = [{}];
    // for (const key of this.state.menus) {
    //   newMenuObject["ChineseCombos"] = this.state.menus.filter((cate) => cate.category === "Chinese Combos");
    // }

    // console.log(newMenuObject);


    return (
      <div className="App">
        <div className="category">
          <div className="category-heading">
            All
          </div>
          {
            this.state.uniqueCategory.map((x, index) => {
              return <Category
                category={x}
                key={index} />
            })
          }
        </div>


        <div className="detail" style={{ width: "60%" }}>
          {/* {
            this.state.uniqueCategory.map((x, index) => {
              return <Detail
                uniquecategory={x}
                key={index} />
            })
          } */}
          {
            this.state.menus.map((m, index) => {
              return <Detail
                itemRemoved={() => this.removeItemHandler(index)}
                itemAdded={() => this.AddItemHandler(index)}
                category={m.category}
                name={m.name}
                description={m.description}
                price={m.price}
                key={index} />
            })
          }
        </div>

        <Cart className="cart" />
      </div>
    );
  }
}

export default App;
