export function tooltip(node: HTMLElement, text: string | null) {
  let tooltipElement: HTMLDivElement | null = null;

  function createTooltip() {
    if (!text) return;
    tooltipElement = document.createElement('div');
    tooltipElement.className = 'absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10';
    tooltipElement.textContent = text;

    const arrow = document.createElement('div');
    arrow.className = 'absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900';
    tooltipElement.appendChild(arrow);

    document.body.appendChild(tooltipElement);
    positionTooltip();
  }

  function positionTooltip() {
    if (!tooltipElement) return;
    const rect = node.getBoundingClientRect();
    tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
    tooltipElement.style.top = `${rect.top}px`;
  }

  function showTooltip() {
    if (!text || !node.hasAttribute('disabled')) return;
    createTooltip();
  }

  function hideTooltip() {
    if (tooltipElement) {
      tooltipElement.remove();
      tooltipElement = null;
    }
  }

  node.addEventListener('mouseenter', showTooltip);
  node.addEventListener('mouseleave', hideTooltip);
  window.addEventListener('scroll', positionTooltip);
  window.addEventListener('resize', positionTooltip);

  return {
    update(newText: string | null) {
      text = newText;
      hideTooltip();
      if (node.matches(':hover')) {
        showTooltip();
      }
    },
    destroy() {
      hideTooltip();
      node.removeEventListener('mouseenter', showTooltip);
      node.removeEventListener('mouseleave', hideTooltip);
      window.removeEventListener('scroll', positionTooltip);
      window.removeEventListener('resize', positionTooltip);
    }
  };
} 