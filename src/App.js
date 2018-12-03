import React, { PureComponent as Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    popArray : [],
    optimum: 0,
    renderArr: [],
    num: 20,
    const: 0.02
  }

  componentWillMount() {
    this.Population();
    this.main();
  }

  Population = () => {
    for ( let i = 0; i < 10; i++ ) {
      const kletka = {
        gen: Math.floor(Math.random() * 32).toString(2),
      };
      switch (kletka.gen.length) {
        case 1: kletka.gen = '0000' + kletka.gen; break;
        case 2: kletka.gen = '000' + kletka.gen; break;
        case 3: kletka.gen = '00' + kletka.gen; break;
        case 4: kletka.gen = '0' + kletka.gen; break;
        default:;
      }
      kletka.fitness = Math.abs(this.state.num - parseInt(+(kletka.gen), 2));
      this.state.popArray.push(kletka);
      this.state.renderArr.push(kletka);
    }
    this.state.popArray.sort((a, b) => a.fitness - b.fitness);
  }

  Rand = (arr) => {
    const newArr = [];
    for (let i = 0; i < 2; i++) {
      newArr.push(arr[Math.floor(Math.random() * 5)])
    }
    for (let i = 0; i < 3; i++) {
      newArr.push(arr[Math.floor(Math.random() * 10)])
    }
    return newArr;
  }

  Skres = (arr) => {
    const newArr = arr;
    const mens = this.Rand(arr);
    const womens = this.Rand(arr);
    let rand = [];
    for (let i = 0; i < 5; i++) {
      rand.push(Math.floor(Math.random() * 6));
      rand.push(Math.floor(Math.random() * 6));
      rand.sort();
      const kletka = {
        gen: mens[i].gen.substring(0, rand[0])
        + womens[i].gen.substring(rand[0], rand[1])
        + mens[i].gen.substring(rand[1])
      }
      kletka.fitness = Math.abs(this.state.num - parseInt(+(kletka.gen), 2));
      newArr.push(kletka);
      rand = [];
    }
    return newArr;
  }

  Mutation = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < 5; j++) {
        if (Math.random() < this.state.const) {
          if (arr[i].gen.charAt(j) === '1') {
            arr[i].gen = arr[i].gen.substring(0, j) + '0' + arr[i].gen.substring(j + 1)
          } else {
            arr[i].gen = arr[i].gen.substring(0, j) + '1' + arr[i].gen.substring(j + 1)
          }
        }
      }
      arr[i].fitness = Math.abs(this.state.num - parseInt(+(arr[i].gen), 2));
    }
    arr.sort((a, b) => a.fitness - b.fitness);
    return arr;
  }

  Otbor = (arr) => {
    const newArr = [ ...arr];
    const randArr = [];
    let j = 0;
    for (let i = 0; i < newArr.length; i++) {
      randArr.push(j + newArr[i].fitness);
      j += 1;
    }
    for (let i = 0; i < 5; i++) {
      let randNumber = Math.floor(Math.random() * randArr[newArr.length - 1]);
      for (let k = 0; k < randArr.length; k++ ) {
        if (randNumber < randArr[k]) {
          newArr.splice(k, 1)
          break;
        }
      }
    }
    newArr.sort((a, b) => a.fitness - b.fitness);
    this.setState({ renderArr: [ ...this.state.renderArr, ...newArr ]})
    return newArr;
  }

  main = () => {
    let opt = 0;
    const skresPop = [ ...this.Skres(this.state.popArray)];
    let mutPop = [...this.Mutation(skresPop)];
    const newPop = this.Otbor(mutPop)
    this.setState({
      popArray: [...newPop],
    });
    for ( let j = 0; j < 10; j++) {
      opt = (opt + this.state.popArray[j].fitness);
    }
    this.setState({
      optimum: opt / 10
    });
  }

  render() {
    console.log(this.state);
     if (this.state.optimum > 1) {
       this.main();
     }
    return (
      <div className="app">
        <span className="title"> Genetic Algorithm </span>
        <button className="button" onClick={this.main}>{this.state.optimum}</button>
        <div className="wrapper">
          {this.state.renderArr.map(item =>
            <div className={`kletka c${item.gen}`} />
          )}
        </div>
        <span className="subtitle"> Postavte za4ot pliz </span>
      </div>
    );
  }
}

export default App;
