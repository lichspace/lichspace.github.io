
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startPageShow:true,
            gamePage:false
        }
    }

    start=()=>{
        console.log("start")
        this.setState({
            startPageShow:false,
            gamePage:true
        })
    }

    render() {
        return (
            <div>
                <FirstPage show={this.state.startPageShow} start={this.start}/>
                <Gamepage show={this.state.gamePage}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));