export default function shuffleArray(arr) {
  return arr
    .map(el => ({ value: el, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(el => el.value);
}