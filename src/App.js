import React, { Component } from 'react'
// TODO this is creative commons
import logo from './logo.svg'
import './Plenty.css'
import boat_types from './boats.js'
import LogisticModel from './Model.js'
import render_number from './utils.js'



// TODO
// done
// environmental simulation
// NEED
// Boats catch finite fish using actual simulation
// science boats
// catch and release
// environmental graph
// oysters
// WANT
// selling is non-trivial
// boat upgrades?
// multiple markets
// multiple populations?
// turn off boats
// fishing animations?
// brave the dark waters modifies as you get more advanced
// MAYBE
// boat staffing?


class Plenty extends Component {
   constructor(props) {
    super(props)
    this.state = {
                fleet: new Fleet(),
                catch:0,
                fish_pop: new LogisticModel(),
            }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      2000
    );
  }

  tick() {
    this.fish()
    this.state.fish_pop.tick()
    this.setState({fish_pop: this.state.fish_pop})
  }

  fish = () => {
    var total_strength = 0
    for (var boat_name in boat_types) {
        var boat = boat_types[boat_name]
        total_strength += this.state.fleet[boat_name] * boat.net
    }
    var fish_caught = this.state.fish_pop.harvest(total_strength)
    this.setState({catch:this.state.catch + fish_caught,
        fish_pop: this.state.fish_pop})
  }

  sellFish = () => {
    this.setState({catch:0})
  }

  releaseFish = () => {
    this.setState({catch:0})
    // todo call into population here, mark them
  }

  buyBoat = (boat_name) => {
    this.state.fleet[boat_name] = this.state.fleet[boat_name] + 1
    this.setState({fleet: this.state.fleet})
    boat_types[boat_name].cost *= 1.2
    boat_types[boat_name].cost = Math.floor(boat_types[boat_name].cost)
  }

  render() {
    return (<div className="Plenty">

          <div className="Plenty-header-spacer">
            <header className="Plenty-header">
              <img src={logo} alt="Logo" />
              <h1 className="Plenty-title">Plenty</h1>
              <h1 className="Plenty-ofFish">of Fish</h1>
              <div style={{display:'none'}}>
              Logo created by JohnnyZi for the Noun project, edited by Me
              </div>
            </header>
          </div>
        <div className="population">
            {Math.floor(this.state.fish_pop.population)}
            <button onClick={()=>    this.setState({catch:1e6})}>
            rich</button>


        </div>
        <FleetDisplay
            fleet={this.state.fleet}
            fish_cb={this.fish}
        />
        <MarketplaceDisplay
            catch={this.state.catch}
            onSell={this.sellFish}
            onBuy={this.buyBoat}
            onRelease={this.releaseFish}
        />
      </div>
    )
  }
}


var upgrades = {
    bait:{
        cost:100,
        bonus:1.5,
    },
    "Seine Nets":{
        cost:500,
        bonus:2,
    },
    canning: {
        cost: 1000,
        bonus:4,
    },

}

class Fleet {
    constructor () {
        for (var boat_name in boat_types) {
             this[boat_name] = 0
        }
        this.rowboat = 1
    }
    description () {
        var lines = Object.keys(boat_types).map((boat_name) => {
            var line = null
            if (this[boat_name] > 1) {
                line =  this[boat_name] + " " + boat_name + "s"
            }
            else if (this[boat_name] === 1) {
                if (boat_name === "rowboat") {
                    return "You have an old rowboat, from your father."
                }
                else {
                    line = boat_name
                }
            }
            if(line){
                return (<li key={boat_name }>{line}</li>);
            }
            return null

        }).filter(x=>x)
        console.log(lines.length)
        if (lines.length === 1){
            return lines
        }
        return <ul> Your fleet: { lines }  </ul>
    }
}

class FleetDisplay extends Component {
    render() {
        return (
        <div className='Fleet' >
            <div className='fleet-discription'>
            {this.props.fleet.description()}
            </div>
            <div className='fleet-control'>
            <button onClick={this.props.fish_cb}>
                Brave the dark waters!
            </button>
            </div>
        </div>
        )
    }
}

class MarketplaceDisplay extends Component {

    constructor(props) {
        super(props)
        this.state = {
                cash: 0,
                lifetime_cash: 0,
        }
      }

    sellFish = () => {
        console.log("sell!")
        this.setState({
            cash:this.state.cash + this.props.catch,
            lifetime_cash:this.state.lifetime_cash + this.props.catch,
        })

     this.props.onSell()
    }

    buy = (boat_name) => {
        console.log("buy!", boat_name)
        if (this.state.cash < boat_types[boat_name].cost )
        {
            return
        }
        this.setState({
            cash:this.state.cash - boat_types[boat_name].cost,
        })
        this.props.onBuy(boat_name)

    }

    render_market() {
        return (
            <div>
                {Object.values(boat_types).filter(boat =>
                     this.state.lifetime_cash > 0.8 * boat.cost
                    ).map( (boat) =>
              <MarketBoat boat={boat} key={boat.name} buy={this.buy} />)}
            </div>
          )

      }

   render() {
        return (
            <div className='Marketplace'>
                You have caught {render_number(this.props.catch)} fish.
                <br />
                <button onClick={this.sellFish}>
                    Sell Fish
                </button>
                <button onClick={this.props.onRelease()}>
                    Mark + Release
                </button>
                <br />
                {render_number(this.state.cash)}$
                <br />
                <div>
                    Boat Market
                </div>
                {this.render_market()}
            </div>
        )
    }
}
class MarketBoat extends Component {
       render() {
        return (<div className="MarketBoat" onClick={
            (e) => this.props.buy(this.props.boat.name)}>
        {this.props.boat.name} <br/>
        ${render_number(this.props.boat.cost)}
        </div>
        )
       }

}


export default Plenty
