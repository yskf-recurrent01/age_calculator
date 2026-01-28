// セレクトボックスの要素を取得
const yearSelect = document.getElementById('year');
const monthSelect = document.getElementById('month');
const dateSelect = document.getElementById('date');
const btnCalc = document.getElementById('btn-calc');

// 結果表示エリア
const ageResult = document.getElementById('result-age');
const countdownResult = document.getElementById('result-countdown');

let timerId = null; // タイマーID管理用

// 初期化処理
function init() {
  generateYearMonthOptions();

  // イベントリスナーの設定

  [yearSelect, monthSelect, dateSelect].forEach(select => {
    select.addEventListener('change', () => {
      // 年・月の場合は日の選択肢を更新（日は更新しない）
      if (select !== dateSelect) updateDayOptions();
     
      // 年・月・日が変更されたらタイマーを止める
      if (timerId) clearInterval(timerId);
    });
  });
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
  let now = new Date();
  for (let i = 1900; i <= now.getFullYear(); i++) {
    let yearOptionElm = document.createElement('option');
    yearOptionElm.innerText = i;
    yearOptionElm.setAttribute('value', i);

    yearSelect.append(yearOptionElm);
  }

  for (let i = 1; i <= 12; i++) {
    let monthOptionElm = document.createElement('option');
    monthOptionElm.innerText = i;
    monthOptionElm.setAttribute('value', i);

    monthSelect.append(monthOptionElm);
  }  // 日の選択肢も初期化しておく（とりあえず1〜31日などで）
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

  // TODO: dateSelectの中身をクリア(innerHTML = "")して、末日までのoptionを再生成する
  dateSelect.innerHTML = '<option value="" selected disabled>日</option>'
  let { selectedYear, selectedMonth } = getSelectValues();
  let endOfMonth;
  if (!isNaN(selectedYear) && !isNaN(selectedMonth)) {
    // 当月の末日 = 次月の0日を取得
    endOfMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    for (let i = 1; i <= endOfMonth; i++) {
      let dateOptionElm = document.createElement('option');
      dateOptionElm.innerText = i;
      dateOptionElm.setAttribute('value', i);
      dateSelect.append(dateOptionElm);
    }
  }
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
  let birthDate = getBirthDate();
  if (!birthDate) return; //日付が不正なら何もしない

  let now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  let m = now.getMonth() - birthDate.getMonth();
  if (m < 0 || m === 0 && (now.getDate() - birthDate.getDate() < 0)) {
    age--;
  }
  ageResult.innerText = `${age} 歳`;
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
  let birthDate = getBirthDate();
  if (!birthDate) return; //日付が不正なら何もしない

  let { selectedMonth, selectedDate } = getSelectValues();
  let now = new Date();
  let nextBirthDate = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (now > nextBirthDate) {
    nextBirthDate = new Date(now.getFullYear() + 1, selectedMonth, selectedDate);
  }
  let timestamp = Math.floor((nextBirthDate - now) / 1000);
  let s = Math.floor(timestamp % 60);
  let m = Math.floor((timestamp / 60) % 60);
  let h = Math.floor((timestamp / 60 / 60) % 24);
  let d = Math.floor((timestamp / 60 / 60 / 24));
  countdownResult.innerText = `${d}日 ${h}時間 ${m}分 ${s}秒`
}

// リファクタリング時に追加した関数
/**
 * セレクトボックスの値を取得して返す
 * @returns {{selectedYear: number, selectedMonth: number, selectedDate: number}} 選択された年・月(0始まり)・日を含むオブジェクト
 */
function getSelectValues() {
  let selectedYear = parseInt(yearSelect.value);
  let selectedMonth = parseInt(monthSelect.value) - 1;
  let selectedDate = parseInt(dateSelect.value);
  return { selectedYear, selectedMonth, selectedDate };
}

/**
 * 選択された値から誕生日のDateオブジェクトを生成して返す
 * @returns {Date|undefined} 有効な日付が選択されている場合はDateオブジェクト、それ以外はundefined
 */
function getBirthDate() {
  let { selectedYear, selectedMonth, selectedDate } = getSelectValues();
  if (!isNaN(selectedYear) && !isNaN(selectedMonth) && !isNaN(selectedDate)) {
    return new Date(selectedYear, selectedMonth, selectedDate)
  }
}

// アプリ実行
init();
