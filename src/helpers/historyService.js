const HISTORY_KEY = 'dataHistory'

export default {
  getDataHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
  },
  saveDataHistory(history) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  },
  addToHistory(data) {
    const history = this.getDataHistory()
    history.push(data)
    this.saveDataHistory(history)
  },
  removeToHistory() {
    const history = this.getDataHistory()
    history.pop()
    this.saveDataHistory(history)
    return history
  },
  clearHistory() {
    localStorage.removeItem(HISTORY_KEY)
  }
}