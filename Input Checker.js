function isEmptyOrSpaces(str) {
	return str === null || str.match(/^ *$/) !== null;
}

function printErorr(where, str) {
	if (!$(where).next().html()) {
		if (str == "None") {
			$(where).after("<p class='danger_p'>" + $(where).prev().html() + " خود را وارد کنید .</p>");
		}
		else {
			$(where).after("<p class='danger_p'>" + $(where).prev().html() + str);
		}
		$("html, body").animate({ scrollTop: 0 }, "slow");
	}
}

function removeErorr(where) {
	if ($(where).next().hasClass("danger_p")) {
		$(where).next().remove();
	}
}

function nationalIdCheck(where) {
	if ($(where).attr("id") == "national_id") {
		e = where.value
		if (!/^\d{10}$/.test(e)) return !1;
		for (var t = parseInt(e[9]), n = 0, l = 0; l < 9; ++l) n += parseInt(e[l]) * (10 - l);
		if (!(1 == (n %= 11) < 2 && t == n || 2 <= n && t + n == 11)) {
			printErorr(where, " خود را به درستی وارد کنید .")
			return true
		}
	}
}



function JustNumberCheck(where) {

	if ($(where).attr("id") == "Phone_fax") {
		if (!(new RegExp("^(\\+98|0)\\d{10}$").test(where.value))) {
			printErorr(where, " خود را به درستی وارد کنید .")
			return true;
		}
	}
}

function JustEmailCheck(where) {

	if ($(where).attr("id") == "id_email") {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!(re.test(String(where.value).toLowerCase()))) {
			printErorr(where, " خود را به درستی وارد کنید .")
			return true;
		}
	}
}

function ForInelm(frm_inp) {
	for (var i = 0; i < frm_inp.length; i++) {
		if (frm_inp[i].hasAttribute('required')) {
			ob1 = nationalIdCheck(frm_inp[i])
			ob2 = JustNumberCheck(frm_inp[i])
			ob3 = JustEmailCheck(frm_inp[i])
			if (ob2 || ob1 || ob3) {
				continue
			}
			if (isEmptyOrSpaces(frm_inp[i].value)) {
				printErorr(frm_inp[i], "None")
			}
			else {

				removeErorr(frm_inp[i])
			}
		}
	}
}

function submit_check(form_id) {
	el_frm = document.getElementById(form_id)
	ForInelm(el_frm.getElementsByTagName('input'))
	ForInelm(el_frm.getElementsByTagName('textarea'))
	ForInelm(el_frm.getElementsByTagName('select'))
	$(".danger_p").css({

		'padding': '0.4rem 0.3rem',
		'font-size': '0.75rem',
		'background': '#f9e6e6',
		'text-align': 'center',
		'border-radius': '0px 0px 16px 16px',
		'color': '#fc381d'
	});
}

