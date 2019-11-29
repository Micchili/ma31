const puppeteer = require("puppeteer");

// リストを読み込む

// リストからURLを取得する

(async () => {
    // 取得したURLにアクセスする
    let target_url = "https://www.hal.ac.jp/request?school=TH";

    // ヘッドレスブラウザを立ち上げる
    const browser = await puppeteer.launch();

    // タブを開く
    const page = await browser.newPage();

    // 指定のURLにアクセスする
    await page.goto(target_url);

    // 1.5秒 待つ
    await page.waitFor(1500);

    // 入力
    await page.type("#last-name", "ほげ")
    await page.type("#first-name", "まさる")

    await page.type("#age", "42")

    // セレクト
    await page.select('select[name="job"]', "07");

    let data = await page
        .$eval('input[name="gender"][value="1"]',
            item => {
                item.click()
                return item.value;
            });
    console.log(data);



    // ラジオ・ボタン クリック
    await page.click('button.submit');


    // アクセス先でボタンを押せるようにする。

    // スクリーンショットをとる。(デバッグ用)
    await page.screenshot({
        path: "./screenshot.png",
        fullPage: true
    });

    // ブラウザを閉じる
    await browser.close();

})();