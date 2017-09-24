class Gamepage extends React.Component {
    constructor(props) {
        super(props);
        this.n = null;//分组索引
        this.count = {right:0,total:0}
        this.cyIndex = 0;
        this.timerID = null
        this.step = 31
        this.group = 6
        this.data = []
        this.running = false
        this.timeout = 3*60
        this.end = false
        this.state = {
            selected:null,
            endOpen:false,
            timeout:0,
            end:false,
            text:"点击开始",
            correct:"0/0",
            buttonShow:false
        }
        this.result = []
        this.resultTime = []
    }

    select=(n)=>{
        this.n =n;
        this.end = false
        this.setState({selected:n})
        this.oneEnd()
        this.result[n] = []
        this.data[n] = cyArr.slice(n*this.step,(n+1)*this.step)
        this.setState({timeout:0,text:"点击开始"})
    }

    oneEnd = ()=>{
        this.count = {right:0,total:0}
        this.cyIndex = 0;
        clearInterval(this.timerID)
        this.running = false
        this.setState({buttonShow:false})

        console.log(this.result,this.resultTime)

    }

    start=()=>{
        if(this.data.length==0){
            alert("先选择一个分组")
            return
        }

        if(this.running) return
        this.setState({buttonShow:1})
        this.timer()
        this.right()
        this.running = true
    }

    timer= ()=>{
        this.timerID = setInterval(()=>{

            var t = ++this.state.timeout
            if(t<this.timeout){
                this.setState({timeout:t})
            }else{
                this.end = true
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

        //console.log(this.end)
        if(this.end) return

        if(this.cyIndex>data.length-1){
            clearInterval(this.timerID)
        }else{
            var text = data[this.cyIndex]
            this.result[this.n].push({text:text,correct:r})
            if(r!==undefined){
                this.count.total++
                if(r) this.count.right++
            }
            this.resultTime[this.n] = this.state.timeout+1
            this.setState({text:text,correct:this.count.right+"/"+this.count.total})
            this.cyIndex++
        }
    }

    endopen = ()=>{
        this.setState({endOpen:!this.state.endOpen})
        var elm = document.querySelector("#result_show_box")
        var s = ""
        this.result.forEach((el,n)=>{
            var len = el.length
            var correct = 0
            s+="<ul>"
            s+=`<li>第${n+1}组 用时${this.resultTime[n]}s</li>`
            el.forEach(v=>{
                if(v.correct) correct++
                s+= `<li class="${v.correct?"":"red"}">${v.text}</li>`
            })
            if(len) s+=`<li>猜中：${(correct)}<br/>正确率：${(correct/len).toFixed(2)}<br/>平均用时${(this.resultTime[n]/len).toFixed(2)}</li>`
            s+="</ul>"
        })

        elm.innerHTML = s

    }

    render() {
        var buttons=[];
        for(let i=0;i<this.group;i++){
            buttons.push(<button className={this.state.selected==i?"cur":""} key={i} onClick={this.select.bind(this,i)}>{i+1+"组"}</button>)
        }
        return (
            <div className={"GamePage "+(this.props.show?"":"hidden")}>

                <div className="select">
                    {buttons}
                </div>
                <div className="time">
                    计时：{this.state.timeout}s
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    正确/总数 {this.state.correct}
                </div>
                <div className="text" onClick={this.start}>{this.state.text}</div>
                <div className={"btn "+(this.state.buttonShow?"":"hidden")}>
                    <button style={{background:"green"}} onClick={this.right.bind(this,1)}>正确√</button>
                    <button onClick={this.right.bind(this,0)}>跳过×</button>
                    <button onClick={this.oneEnd}>完成</button>
                </div>

                <div className="result" onClick={this.endopen.bind(this,true)}>END</div>
                <div id="result_show" className={"result_show "+(this.state.endOpen?"":"hidden")}>
                    <div className="result_show_box" id="result_show_box"></div>
                </div>
            </div>
        )
    }
}