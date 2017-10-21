function FirstPage(props){
    return(
        <div className={"FirstPage "+(props.show?"":"hidden")}>
            <p className="rule">
                规则：大屏幕显示的词或成语，限时3分钟，每组30个，猜中多者为胜
                <br/>
                每组2为同学负责猜，其他负责描述，中间可以换人
            </p>
            <p className="yindao">产品研发中心<span>Rund2猜猜接龙游戏</span>— just play —</p>
            <div className="start-button" onClick={props.start}>START</div>
        </div>

    )
}