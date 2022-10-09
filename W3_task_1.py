# 印出:景點名稱,區域,經度,緯度,第一張圖檔網址
# 要求一:請根據 xpostDate 欄位,僅輸出 2015 年以後 ( 包含 2015 年 ) 的資料。
# 要求二:行政區域必須是三個字。
# 輸出格式為csv
# 輸出範例:新北投溫泉區,北投區,123.5446,24.5312,https://www.travel.taipei/pic/11000848.jpg

# 解題步驟1.0:
# 1.先把東西從網頁上抓下來。
# 2.輸出格式是csv檔。
# 3.for迴圈
# 4.行政區、2015年、第一張照片網址!

# 解題步驟2.0:
# 網頁資料是:
# 字典 (包裹) 字典 (包裹) 清單 (包裹) 字典[key、value]
# 1. 載入套件utllib,json,csv。
# 2. 抓取、載入網頁資料
# 3. csv.writer
# 4. 把2015抓出來轉成數字用if比大小，大於等於2015年的資料才放入迴圈
# 5. 宣告變數(景點名稱,區域,經度,緯度,第一張圖檔網址)
# 6. 行政區抓3個字[5:8]
# 7. 用split分割["file"]、取出第一個網址(其元素序號是[1]，因為[0]被割掉了是空號)
# 8. writer.writerow 依序放入變數、取值


import urllib.request as request
import json
import csv
src = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
with request.urlopen(src) as response:
    dict_data = json.load(response)  # 利用 json模組處理 json資料格式
# print(dict_data)

attractions_list = dict_data["result"]["results"]
with open("data01.csv", "w", encoding="utf-8", newline="") as csvfile:
    writer = csv.writer(csvfile)
    for attractions in attractions_list:
        year = int(attractions["xpostDate"][0:4])
        if year >= 2015:
            stitle = attractions["stitle"]
            address = attractions["address"][5:8]
            longitude = attractions["longitude"]
            latitude = attractions["latitude"]
            first_image = "https://"+attractions["file"].split("https://")[1]
            writer.writerow(
                [stitle, address, longitude, latitude, first_image])
