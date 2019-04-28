let tagRE = /(?:<!--[\S\s]*?-->|<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>)/g;
const parse = (html, tag)=>{
    let level = -1
    let current = {}
    let result = []
    let arr = [];

    html.replace(tagRE, (tag, index)=>{

        let isOpen = tag.charAt(1) !== '/';
        let isComment = tag.indexOf('<!--') === 0;
        let start = index + tag.length;
        if (isOpen && !isComment) {
            level++;

            let end = html.indexOf('<', start);
            let content = html.slice(start, end === -1 ? undefined : end);


            current = {
                tag, level,
                children:[
                    {
                        type:'text',
                        content
                    }
                ]}
            // if we're at root, push new base node
            if (level === 0) {
                result.push(current);
            }

            parent = arr[level - 1];

            if (parent) {
                parent.children.push(current);
            }

            arr[level] = current;
        }

        if(!isOpen){
            level--
            let end = html.indexOf('<', start);
            let content = html.slice(start, end === -1 ? undefined : end);
            // if a node is nothing but whitespace, no need to add it.
            parent = level === -1 ? result : arr[level].children;
            if (!/^\s*$/.test(content)) {
                parent.push({
                    type: 'text',
                    content: content
                });
            }


        }
    })
    return result
}


let str = `
<div> this is a div
<P id="myid"><!--IMG_0--></P><P><STRONG>作者 | Sherry Wang</STRONG> p end </P><P><STRONG>编辑 | Drizzie</STRONG></P><P>短短30年间，奢侈品牌从小心翼翼探入中国市场到扎堆在中国办秀，背后是中国市场战略地位的急剧抬升。</P>
    <P>据时尚商业快讯，Fendi、Chloé和Prada宣布将分别于5月31日、6月5日和6月6日于上海举办时装秀。三大奢侈品牌将在上海举办时装秀，
    <STRONG>时隔不超过一周，充满硝烟味</STRONG>
    ，引发广泛的关注。</P>
    <P>对于三个品牌来说，此次的时装秀都有特殊意义。Prada的2020男装系列为品牌首次在米兰之外的城市举办男装秀。Chloé将其史上首个季前系列（Pre-collection）时装秀选址于上海，这也是品牌首次在巴黎之外的城市办秀。Fendi则为纪念已故前创意总监“老佛爷”Karl Lagerfeld，将在上海宝龙美术馆重现其设计的2019秋冬系列，也是品牌首次男女装合并大秀。</P>
    <P>事实上，近来奢侈时尚品牌来中国办秀愈发频繁，且噱头十足，凸显了其对中国市场及消费者的重视。去年12月8日，美国轻奢品牌Coach在上海举办了“Coach Lights Up Shanghai”大秀，也是品牌首次在纽约之外的城市举办男女装合并秀。</P>
    <P>同年11月22日，意大利奢侈品牌Miu Miu时隔7年二度在上海办秀，重现了其2019早春系列时装秀。2011年，Miu Miu曾在地标性的柏悦酒店举办以20世纪40年代为主题的时装秀。此外，美国轻奢品牌Tommy Hilfiger 2018秋冬系列和Prada的2018早春女装系列也都在上海举办时装秀。而美国内衣品牌Victoria's Secret维多利亚的秘密大秀成为2017年舆论的集体狂欢，门票一度炒到了30万元一张。</P>
    <P>值得关注的是，去年11月原定于Miu Miu2019早春系列秀前一天举办的意大利奢侈品牌Dolce&Gabbana上海大秀，最终因品牌创始人Stefano Gabbana “辱华风波”临时取消。</P>
    <P><!--IMG_1--></P><P><!--IMG_2--></P><P><!--IMG_3--></P>

    div end

    </div>
`

console.log('***********************************')
let result = parse(str)
console.log(result)
//console.log(JSON.stringify(result,null,4))