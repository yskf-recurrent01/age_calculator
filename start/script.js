// セレクトボックスの要素を取得
const yearSelect = document.getElementById('year');
const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');
const btnCalc = document.getElementById('btn-calc');

// 結果表示エリア
const ageResult = document.getElementById('result-age');
const countdownResult = document.getElementById('result-countdown');

let timerId = null; // タイマーID管理用

// 初期化処理
function init() {
  generateYearMonthOptions();

  // イベントリスナーの設定
  // 年・月が変わったら日を更新する
  yearSelect.addEventListener('change', updateDayOptions);
  monthSelect.addEventListener('change', updateDayOptions);

  // 計算ボタン
  btnCalc.addEventListener('click', () => {
    calculateAge();
    // 既存のタイマーがあればクリアして、新しいカウントダウンを開始
    if (timerId) clearInterval(timerId);
    updateCountdown();
    timerId = setInterval(updateCountdown, 1000);
  });
}

/**
 * 年と月のセレクトボックスを生成する
 */
function generateYearMonthOptions() {
  // TODO: 年（1900〜現在）と月（1〜12）のoptionタグを生成して追加する
  // ヒント: document.createElement('option'), appendChild, for文

  // 日の選択肢も初期化しておく（とりあえず1〜31日などで）
  updateDayOptions();
}

/**
 * 選択された年・月に応じて日のセレクトボックスを更新する
 */
function updateDayOptions() {
  // 選択されている年と月を取得
  // まだ選択されていない場合(valueが空)は、適当なデフォルト値(現在の年、1月など)を使うか、
  // または日を31日で固定して作るなどの対応をする

  // TODO: その月の末日を取得する
  // ヒント: new Date(year, month, 0).getDate()

  // TODO: daySelectの中身をクリア(innerHTML = "")して、末日までのoptionを再生成する

}

/**
 * 年齢を計算して表示する
 */
function calculateAge() {
  // TODO: 年齢計算ロジック
  // 1. セレクトボックスの値から入力された生年月日(Date)を作成
  // 2. 現在日時(Date)を取得
  // 3. 単純な「年」の引き算だけでなく、誕生日が来ていない場合の補正を行う
  // 4. 結果を #result-age に表示

}

/**
 * 次の誕生日までのカウントダウンを表示する
 */
function updateCountdown() {
  // TODO: カウントダウンロジック
  // 1. 次の誕生日を求める
  //    - 今年の誕生日がすでに過ぎているか判定
  //    - 過ぎていれば「来年の誕生日」、まだなら「今年の誕生日」をターゲットにする
  // 2. (次の誕生日 - 現在日時) でミリ秒の差分を計算
  // 3. ミリ秒を 日・時・分・秒 に変換
  // 4. #result-countdown に表示

}

// アプリ実行
init();
