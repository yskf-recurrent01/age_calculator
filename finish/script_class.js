class AgeCalculator {
  constructor() {
    // DOM要素の取得
    this.yearSelect = document.getElementById('year');
    this.monthSelect = document.getElementById('month');
    this.dateSelect = document.getElementById('date');
    this.btnCalc = document.getElementById('btn-calc');
    this.ageResult = document.getElementById('result-age');
    this.countdownResult = document.getElementById('result-countdown');

    this.timerId = null;

    // 初期化実行
    this.init();
  }

  init() {
    this.generateYearMonthOptions();

    // イベントリスナー登録 (thisをバインドする)
    this.yearSelect.addEventListener('change', () => this.updateDayOptions());
    this.monthSelect.addEventListener('change', () => this.updateDayOptions());
    this.btnCalc.addEventListener('click', () => this.handleCalcClick());
  }

  generateYearMonthOptions() {
    const now = new Date();
    for (let i = 1900; i <= now.getFullYear(); i++) {
      const option = document.createElement('option');
      option.innerText = i;
      option.value = i;
      this.yearSelect.appendChild(option);
    }

    for (let i = 1; i <= 12; i++) {
      const option = document.createElement('option');
      option.innerText = i;
      option.value = i;
      this.monthSelect.appendChild(option);
    }
    this.updateDayOptions();
  }

  updateDayOptions() {
    // 日付選択肢のリセット
    this.dateSelect.innerHTML = '<option value="" selected disabled>日</option>';

    const { selectedYear, selectedMonth } = this.getSelectValues();
    if (!isNaN(selectedYear) && !isNaN(selectedMonth)) {
      const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      for (let i = 1; i <= endOfMonth; i++) {
        const option = document.createElement('option');
        option.innerText = i;
        option.value = i;
        this.dateSelect.appendChild(option);
      }
    }
  }

  handleCalcClick() {
    this.calculateAge();

    if (this.timerId) clearInterval(this.timerId);
    this.updateCountdown();
    this.timerId = setInterval(() => this.updateCountdown(), 1000);
  }

  calculateAge() {
    const birthDate = this.getBirthDate();
    if (!birthDate) return;

    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    const m = now.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
      age--;
    }
    this.ageResult.innerText = `${age} 歳`;
  }

  updateCountdown() {
    const birthDate = this.getBirthDate();
    if (!birthDate) return;

    const { selectedMonth, selectedDate } = this.getSelectValues();
    const now = new Date();
    let nextBirthDate = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (now > nextBirthDate) {
      nextBirthDate = new Date(now.getFullYear() + 1, selectedMonth, selectedDate);
    }

    const timestamp = Math.floor((nextBirthDate - now) / 1000);
    const s = Math.floor(timestamp % 60);
    const m = Math.floor((timestamp / 60) % 60);
    const h = Math.floor((timestamp / 60 / 60) % 24);
    const d = Math.floor(timestamp / 60 / 60 / 24);

    this.countdownResult.innerText = `${d}日 ${h}時間 ${m}分 ${s}秒`;
  }

  getSelectValues() {
    const selectedYear = parseInt(this.yearSelect.value);
    const selectedMonth = parseInt(this.monthSelect.value) - 1;
    const selectedDate = parseInt(this.dateSelect.value);
    return { selectedYear, selectedMonth, selectedDate };
  }

  getBirthDate() {
    const { selectedYear, selectedMonth, selectedDate } = this.getSelectValues();
    if (!isNaN(selectedYear) && !isNaN(selectedMonth) && !isNaN(selectedDate)) {
      return new Date(selectedYear, selectedMonth, selectedDate);
    }
  }
}

// アプリケーションの開始
new AgeCalculator();
