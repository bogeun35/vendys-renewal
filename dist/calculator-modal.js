/* Official entry evidence: PromoPopup in work/site-public-js.txt embeds
   https://smore.im/quiz/14YvQ7Ws0R as a 420x650 dialog. Its fields and saving
   formula were unavailable. This local prototype uses explicit sample inputs;
   budget = people * monthly allowance, never an invented saving estimate. */
(() => {
  'use strict';
  if (/\/calculator(?:\.html)?\/?$/.test(location.pathname)) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'cost-dialog';
  dialog.setAttribute('aria-labelledby', 'cost-dialog-title');
  dialog.innerHTML = `<div class="cost-dialog-head"><div><p class="cost-kicker">우리 회사 식대 점검</p><h2 id="cost-dialog-title" tabindex="-1">우리 회사 식대 살펴보기</h2></div><button class="cost-close" type="button" aria-label="식대 계산기 닫기">×</button></div>
  <p class="cost-intro">식대 규모를 확인하고, 우리 회사에 맞는 운영 방식을 찾아보세요.</p>
  <p class="cost-sample">프로토타입 · 입력값은 예시입니다. 실제 절감액을 산출하지 않습니다.</p>
  <form class="cost-form"><label for="cost-people">이용 예정 직원 수 <span>명</span></label><input id="cost-people" type="number" inputmode="numeric" min="1" max="1000000" step="1" value="100" required>
  <label for="cost-allowance">1인당 월 식대 <span>원</span></label><input id="cost-allowance" type="number" inputmode="numeric" min="0" max="10000000" step="1" value="200000" required>
  <label for="cost-method">현재 지급 방식</label><select id="cost-method"><option>법인카드</option><option>종이식권</option><option>급여 포함 지급</option><option>구내식당</option><option>기타</option></select>
  <button class="cost-submit" type="submit">식대 규모 확인하기 <span aria-hidden="true">→</span></button></form>
  <section class="cost-result" hidden aria-live="polite"><p class="cost-kicker">입력값 기준 식대 예산</p><h3 tabindex="-1">월 <strong></strong>원</h3><p class="cost-year"></p><p class="cost-guidance"></p><p class="cost-result-note">직원 수 × 1인당 월 식대의 단순 예산 계산입니다. 수수료·사용률·절감률은 반영하지 않았습니다.</p><a class="cost-consult" href="consult.html">우리 회사에 맞는 도입 상담 →</a></section>
  <p class="cost-privacy">입력 내용은 저장하거나 전송하지 않습니다.</p>`;
  document.body.append(dialog);
  const launcher = document.createElement('button');
  launcher.type = 'button'; launcher.className = 'cost-launcher';
  launcher.innerHTML = '<span aria-hidden="true">▦</span> 식대 계산기';
  launcher.setAttribute('aria-haspopup', 'dialog');
  document.body.append(launcher);
  let previousFocus, previousOverflow;
  function open(trigger) {
    if (dialog.open) return;
    previousFocus = trigger; previousOverflow = document.body.style.overflow;
    dialog.showModal(); document.body.style.overflow = 'hidden';
    dialog.querySelector('#cost-dialog-title').focus(); dialog.scrollTop = 0;
  }
  launcher.addEventListener('click', () => open(launcher));
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button) return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && /\/calculator(?:\.html)?\/?$/.test(url.pathname)) {
      event.preventDefault(); open(link);
    }
  });
  dialog.querySelector('.cost-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow || '';
    if (previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
  });
  // Native modal dialog provides inert background and Escape; keep Tab within visible controls.
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const items = [...dialog.querySelectorAll('button,input,select,a[href]')].filter(el => !el.disabled && el.getClientRects().length);
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.querySelector('h2'))) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  });
  dialog.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const people = dialog.querySelector('#cost-people'), allowance = dialog.querySelector('#cost-allowance');
    if (!event.target.reportValidity()) return;
    const monthly = Number(people.value) * Number(allowance.value);
    if (!Number.isSafeInteger(monthly)) return;
    const method = dialog.querySelector('#cost-method').value;
    const guidance = {'법인카드':'법인카드 사용 내역 확인과 영수증 정산 과정을 함께 살펴보세요.','종이식권':'식권 발행·배부·회수 과정을 모바일로 바꾸는 방법을 살펴보세요.','급여 포함 지급':'지급 정책과 실제 식사 이용을 연결하는 방식을 살펴보세요.','구내식당':'외부 식당 이용과 근무지별 식사 선택지를 함께 살펴보세요.','기타':'현재 지급 기준과 정산 흐름에 맞는 운영 방식을 상담해 보세요.'};
    const result = dialog.querySelector('.cost-result');
    result.querySelector('strong').textContent = monthly.toLocaleString('ko-KR');
    result.querySelector('.cost-year').textContent = '연간 예산 ' + (monthly * 12).toLocaleString('ko-KR') + '원 · 월 예산 × 12개월';
    result.querySelector('.cost-guidance').textContent = guidance[method];
    result.hidden = false; result.querySelector('h3').focus();
  });
})();
