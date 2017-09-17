function FirstPage(props){
    return(
        <div className={"FirstPage "+(props.show?"":"hidden")}>
            <p className="yindao">产品研发中心<span>Rund2成语接龙游戏</span>— just play —</p>
            <div className="start-button" onClick={props.start}>START</div>
        </div>

    )
}