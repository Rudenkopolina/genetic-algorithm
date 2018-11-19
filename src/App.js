import React, { PureComponent as Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    popArray : [],
    optimum: 0,
    renderArr: [],
  }

  componentWillMount() {
    this.Population();
  }

  Population = () => {
    const Pop = [];
    for ( let i = 0; i < 10; i++ ) {
      const kletka = {
        gen: Math.floor(Math.random() * 31).toString(2),
      };
      switch (kletka.gen.length) {
        case 1: kletka.gen = '0000' + kletka.gen; break;
        case 2: kletka.gen = '000' + kletka.gen; break;
        case 3: kletka.gen = '00' + kletka.gen; break;
        case 4: kletka.gen = '0' + kletka.gen; break;
      }
      kletka.fitness = parseInt(+(kletka.gen), 2);
      Pop.push(kletka);
    }
    Pop.sort((a, b) => b.fitness - a.fitness);
    this.setState({ popArray: Pop, renderArr: Pop });
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
    for (let i = 0; i < 5; i++) {
      const kletka = {
        gen: mens[i].gen.substring(0,3) + womens[i].gen.substring(3),
      }
      kletka.fitness = parseInt(+(kletka.gen), 2);
      newArr.push(kletka);
    }
    return newArr;
  }

  Mutation = (arr) => {
    const el = Math.floor(Math.random() * arr.length);
    const mutGen = Math.floor(Math.random() * 5);
    const newGen = Math.round(Math.random());
    arr[el].gen = arr[el].gen.substring(0, mutGen) + newGen + arr[el].gen.substring(mutGen+1);
    arr[el].fitness = parseInt(+(arr[el].gen), 2);
    arr.sort((a, b) => b.fitness - a.fitness);
    return arr;
  }

  Otbor = (arr) => {
    const newArr = arr;
    newArr.sort((a, b) => a.fitness - b.fitness);
    for (let i = 0; i < 2; i++) {
      newArr.splice(Math.floor(Math.random() * (5 - i)), 1)
    }
    for (let i = 0; i < 3; i++) {
      newArr.splice(Math.floor(Math.random() * (12 - i)), 1)
    }
    newArr.sort((a, b) => b.fitness - a.fitness);
    this.setState({ renderArr: this.state.renderArr.concat(newArr)})
    return newArr;
  }

  main = () => {
    let opt = 0;
    const skresPop = this.Skres(this.state.popArray);
    const mutPop = this.Mutation(skresPop);
    this.setState({
      popArray: this.Otbor(mutPop),
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
    if (this.state.optimum < 30) {
      this.main();
    }
    return (
      <div className="App">
        {this.state.renderArr.map(() =>
          <div>popa</div>
        )}
      </div>
    );
  }
}

export default App;
