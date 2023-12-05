// TODO: 이 곳에 정답 코드를 작성해주세요.

// 1. ID input auto-focus 구현
const $id = document.getElementById('id')
window.addEventListener('load', () => $id.focus())

// 2. 유효성 검사
const $pw = document.getElementById('pw')
const $pwCheck = document.getElementById('pw-check')

const $idMsg = document.getElementById('id-msg')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheckMsg = document.getElementById('pw-check-msg')

var ID_REGEXP = new RegExp('^[a-z0-9_-]{5,20}$')
var PW_REGEXP = new RegExp('^[A-Za-z0-9]{8,16}$')

const errMsg = {
    required: '필수 정보입니다.',
    invalidId:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    invalidPwCheck: '비밀번호가 일치하지 않습니다.',
}

const checkRegexp = (target) => {
    const { value, id } = target
    if (value.length === 0) {
        return 'required'
    } else {
        switch (id) {
            case 'id':
                return ID_REGEXP.test(value) ? true : 'invalidId'
            case 'pw':
                return PW_REGEXP.test(value) ? true : 'invalidPw'
            case 'pw-check':
                return value === $pw.value ? true : 'invalidPwCheck'
        }
    }
}

const validation = (target, msgTarget) => {
    const isValid = checkRegexp(target)
    if (isValid !== true) {
        target.classList.add('border-red-600')
        msgTarget.innerText = errMsg[isValid]
    } else {
        target.classList.remove('border-red-600')
        msgTarget.innerText = ''
    }
    return isValid
}

$id.addEventListener('focusout', () => validation($id, $idMsg))
$pw.addEventListener('focusout', () => validation($pw, $pwMsg))
$pwCheck.addEventListener('focusout', () => validation($pwCheck, $pwCheckMsg))

// 전체 유효성 체크 및 입력 확인 모달 창
const $submit = document.getElementById('submit')
const $modal = document.getElementById('modal')

const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

$submit.addEventListener('click', (e) => {
    e.preventDefault()
    const isValidForm =
        validation($id, $idMsg) === true &&
        validation($pw, $pwMsg) === true &&
        validation($pwCheck, $pwCheckMsg) === true
    if (isValidForm) {
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
        $modal.showModal()
    }
})

const $cancel = document.getElementById('cancel-btn')
const $approve = document.getElementById('approve-btn')

$cancel.addEventListener('click', () => {
    $modal.close()
})
$approve.addEventListener('click', () => {
    window.alert('가입되었습니다 🥳 ')
    $modal.close()
    location.reload()
})

// 폰트사이즈 조절 버튼
const $increase = document.getElementById('increase-font-btn')
const $decrease = document.getElementById('decrease-font-btn')
const $html = document.documentElement

const getHtmlFontSize = () => {
    return parseFloat(window.getComputedStyle($html).fontSize)
}

$increase.addEventListener('click', () => {
    onClickFontSizeControl('increase')
})
$decrease.addEventListener('click', () => {
    onClickFontSizeControl('decrease')
})

const onClickFontSizeControl = (flag) => {
    const fontSize = getHtmlFontSize()
    let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
    $html.style.fontSize = newFontSize

    $increase.disabled = newFontSize >= 20
    $decrease.disabled = newFontSize <= 12
}
