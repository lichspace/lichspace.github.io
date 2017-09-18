class Gamepage extends React.Component {
    constructor(props) {
        super(props);
        this.n = null;//分组索引
        this.count = {right:0,total:0}
        this.cyIndex = 0;
        this.timerID = null
        this.step = 13
        this.data = []
        this.running = false
        this.state = {
            endOpen:false,
            timeout:0,
            group0:"第1组",
            group1:"第2组",
            group2:"第3组",
            group3:"第4组",
            end:false,
            text:"点击开始",
            correct:"0/0"
        }
        this.result = [[],[],[],[]]
        this.resultTime = []
    }

    select=(n)=>{
        this.n =n;
        this.count = {right:0,total:0}
        this.cyIndex = 0;
        this.timerID = null
        clearInterval(this.timerID)
        this.running = false
        this.data[n] = cyArr.slice(n*this.step,(n+1)*this.step)
        this.setState({timeout:0,text:"点击开始"})
    }

    start=()=>{
        if(this.data.length==0){
            alert("先选择一个分组")
            return
        }

        if(this.running) return
        this.timer()
        this.right()
        this.running = true
    }

    timer= ()=>{
        this.timerID = setInterval(()=>{
            var t = ++this.state.timeout
            if(t<60){
                this.setState({timeout:t})
            }else{
                clearInterval(this.timerID)
            }
        },1000)

    }


    right=(r)=>{
        var data = this.data[this.n]
        if(data&&data.length==0){
            alert("先选择一个分组")
            return
        }


        if(this.cyIndex>data.length-1){
            clearInterval(this.timerID)
        }else{
            var text = data[this.cyIndex]
            this.result[this.n].push({text:text,correct:r})
            if(r!==undefined){
                this.count.total++
                if(r) this.count.right++
            }
            this.resultTime[this.n] = this.state.timeout
            this.setState({text:text,correct:this.count.right+"/"+this.count.total})
            this.cyIndex++
        }
    }

    endopen = ()=>{
        this.setState({endOpen:!this.state.endOpen})
    }

    render() {
        return (
            <div className={"GamePage "+(this.props.show?"":"hidden")}>

                <div className="select">
                    <button onClick={this.select.bind(this,0)}>{this.state.group0}</button>
                    <button onClick={this.select.bind(this,1)}>{this.state.group1}</button>
                    <button onClick={this.select.bind(this,2)}>{this.state.group2}</button>
                    <button onClick={this.select.bind(this,3)}>{this.state.group3}</button>
                </div>
                <div className="time">
                    计时：{this.state.timeout}s
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    正确/总数 {this.state.correct}
                </div>
                <div className="text" onClick={this.start}>{this.state.text}</div>
                <div className="btn">
                    <button style={{background:"green"}} onClick={this.right.bind(this,1)}>正确√</button>
                    <button onClick={this.right.bind(this,0)}>跳过×</button>
                </div>

                <div className="result" onClick={this.endopen.bind(this,true)}>END</div>
                <div className={"result_show "+(this.state.endOpen?"":"hidden")}>

                </div>
            </div>
        )
    }
}