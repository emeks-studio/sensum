
export function calculateMessageText(length) {
  console.debug('calculateMessageText.length', length);
  // Recall messages go from 3 to 250 characters
  const floor = length <= 10 ? 10 : length;
  //  x < 250    length - 0  %
  //  x < 10     length - 20 %
  const percentage = (Math.log10(250/floor) * 20) / Math.log10(250/20);
  return `${percentage}%`;
};

// FIXME: use it!
export function calculateSize(sensation, isPrimary) {
  const trending = isTrending(sensation);
  const denied = shouldBeDenied(sensation);
  if (!trending && !denied) return 18;
  if (trending) {
    if (isPrimary) return 30;
    else return 15;
  }
  if (denied) {
    if (isPrimary) return 15;
    else return 30;
  }
}