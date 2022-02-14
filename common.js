function tab(data) {
    setTimeout(() => {
        window.open('/' + data + "/", '_self')
    }, 1000);
}

function toast(id) {
    document.getElementById(id).classList.add('show');
    setTimeout(() => {
        document.getElementById(id).classList.remove('show');
    }, 3000);
}

function Focused(id) {
    document.getElementById(id).style.color = '#7BA0CA';
}

function FocusedOUT(id) {
    input = id.substring(0, id.length - 5);
    if (document.getElementById(input).value == "") {
        document.getElementById(id).style.color = '#939393';
    } else {
        document.getElementById(id).style.color = '#7BA0CA';
    }
}

function Decode(txt) {
    let Decoded = txt.replace('.', "%56");
    return Decoded;
}

function Encode(txt) {
    let Encoded = txt.replace('%56', ".");
    return Encoded;
}

function FindMailExistence(txt) {
    const dbRef = firebase.database().ref();
    dbRef.child("users").child(txt).get().then((snapshot) => {
        if (snapshot.exists()) {
            return true;
        } else {
            return false;;
        }
    }).catch((error) => {
        return error;
    });
}

function Toast(id) {
    document.getElementById(id).classList.add('show');
    setTimeout(() => {
        document.getElementById(id).classList.remove('show');
    }, 3000);
}


function inputCode(data_Form, data_Input) {
    // Elements
    const numberCodeForm = document.querySelector('[' + data_Form + ']');
    const numberCodeInputs = [...numberCodeForm.querySelectorAll('[' + data_Input + ']')];

    // Event callbacks
    const handleInput = ({ target }) => {
        if (!target.value.length) { return target.value = null; }

        const inputLength = target.value.length;
        let currentIndex = Number(target.dataset.numberCodeInput);

        if (inputLength > 1) {
            const inputValues = target.value.split('');

            inputValues.forEach((value, valueIndex) => {
                const nextValueIndex = currentIndex + valueIndex;

                if (nextValueIndex >= numberCodeInputs.length) { return; }

                numberCodeInputs[nextValueIndex].value = value;
            });

            currentIndex += inputValues.length - 2;
        }

        const nextIndex = currentIndex + 1;

        if (nextIndex < numberCodeInputs.length) {
            numberCodeInputs[nextIndex].focus();
        }
    }

    const handleKeyDown = e => {
        const { code, target } = e;

        const currentIndex = Number(target.dataset.numberCodeInput);
        const previousIndex = currentIndex - 1;
        const nextIndex = currentIndex + 1;

        const hasPreviousIndex = previousIndex >= 0;
        const hasNextIndex = nextIndex <= numberCodeInputs.length - 1

        switch (code) {
            case 'ArrowLeft':
            case 'ArrowUp':
                if (hasPreviousIndex) {
                    numberCodeInputs[previousIndex].focus();
                }
                e.preventDefault();
                break;

            case 'ArrowRight':
            case 'ArrowDown':
                if (hasNextIndex) {
                    numberCodeInputs[nextIndex].focus();
                }
                e.preventDefault();
                break;
            case 'Backspace':
                if (!e.target.value.length && hasPreviousIndex) {
                    numberCodeInputs[previousIndex].value = null;
                    numberCodeInputs[previousIndex].focus();
                }
                break;
            default:
                break;
        }
    }

    // Event listeners
    numberCodeForm.addEventListener('input', handleInput);
    numberCodeForm.addEventListener('keydown', handleKeyDown);
}