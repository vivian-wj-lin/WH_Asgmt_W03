// 關鍵流程和細節:
// 1. 使用者打開網頁時,立刻透過 JavaScript fetch 連線以上網址,取得景點資料。
// 2. 將取得的景點資料,使用 JavaScript 程式動態的做出畫面,僅顯示景點資料中的第一
// 張圖片和景點的名稱。務必使用 document.createElement() 與 appendChild() 這兩個
// 方法和其相關的技巧搭配完成,禁止使用 innerHTML。
// 3. 前 2 個景點資料顯示在最上方的兩個框框,後續的 8 個景點顯示在下方的八個框框,
// 其餘資料可忽略不顯示。
// 4. 畫面的 RWD 版面設計保持與第一週相同。 

// 解題步驟1.0:
// 1. fetch連線取得資料  
// 2. 取得景點資料中的第一張圖片和景點的名稱。 
// 3. 回html設節點
// 4. 前2張景點名稱與圖片:用document.createElement() 與 appendChild() 改節點   
// 5. 後續的 8 個景點用for迴圈遍歷節點?  

// 解題步驟2.0:
// 1. fetch連線取得資料、找到全部的圖片和景點(for迴圈)推進陣列、回傳值 
// 1. 回html找將新增的景點圖片、名稱的父節點、註解掉html父節點下的原內容
// 1. createElement新增景點照片、textContent新增景點名稱
// 1. 給新照片、景點名加上原本的class
// 1. appendchild //把景點照放回父節點、把景點名稱放回父節點、把景點名、圖的父節點放回它的父節點(大區塊)
// 另起變數J=0 控制景點序數
 

let src="https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json";
fetch(src)
    .then(function(response){
    // console.log(response);
    return response.json();
    })
    .then(function(dataList){
        const attractions = [] 
        for(let i=0;i<dataList.result.results.length;i++){ 
            const attraction={
                attractionName:dataList.result.results[i]["stitle"],//得到景點名稱
                fistImage:"https://"+dataList.result.results[i]["file"].split("https://")[1],//得到第一張圖片
                // console.log(attractionName);//總共58個景點名稱
                // console.log(fistImage);//個別景點的第1張圖片網址
            } 
            //console.log(attraction)
            attractions.push(attraction) //把資料推進陣列
       } 
       return attractions //回傳value
    })

    .then(function (attractions) {
    let j = 0 //景點從0開始

//前2個景點 // html原 class=promotion區塊
    const promotion = document.querySelector('.promotion')
    for (let i = 0; i < 2; i++) {
      const item = document.createElement('div')
      item.className = 'promotion-item'
      const img = document.createElement('img')
      img.src = attractions[j].fistImage
      img.className = 'promotion-photo'
      item.appendChild(img)
      const div = document.createElement('div')
      div.className = 'promotion-text'
      div.textContent = attractions[j].attractionName
      item.appendChild(div)
      // console.log({ j, item })
      promotion.appendChild(item)
      j += 1
    }

//後8個景點 // html原 class=list區塊
    const list = document.querySelector('.list')
    for (let i = 0; i < 8; i++) {
      const item = document.createElement('div')
      item.className = 'product'
      const img = document.createElement('img')
      img.className = 'list-photo'
      img.src = attractions[j].fistImage
      const div = document.createElement('div')
      div.textContent = attractions[j].attractionName
      div.className = 'list-title'
      item.appendChild(img)
      item.appendChild(div)
      list.appendChild(item)
      j++
    }
  })