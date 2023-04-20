
export function FormatPhoneNumber(phoneNumberString) {
    try {
        var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
        var match = cleaned.match(/(\d{0,3})?(\d{0,3})?(\d{0,4})?$/);
        return [
            match[1] ? "(" : "",
            match[1],
            match[2] ? ") " : "",
            match[2],
            match[3] ? "-" : "",
            match[3],
        ].join("");
    } catch (err) {
        return "";
    }
}

export function FormatRegisNumber(regisNumString) {
    try {
        var cleaned = ("" + regisNumString).replace(/\D/g, "");
        var match = cleaned.match(/(\d{0,4})?(\d{0,4})?$/);
        return [
            match[1] ? "" : "",
            match[1],
            match[2] ? "-" : "",
            match[2]
        ].join("");
    } catch (err) {
        return "";
    }
}