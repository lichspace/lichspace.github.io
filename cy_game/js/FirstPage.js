function FirstPage(props){
    return(
        <div className={"FirstPage "+(props.show?"":"hidden")}>
            <p>大屏幕显示的词或成语，限时3分钟，每组30个，猜中多者为胜</p>
            <p className="yindao">产品研发中心<span>Rund2猜猜接龙游戏</span>— just play —</p>
            <div className="start-button" onClick={props.start}>START</div>
        </div>

    )
}