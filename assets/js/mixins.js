export default {
		methods: {
			disableButtons() {
				$(":button").prop("disabled", true);
			},
			enableButtons() {
				$(":button").prop("disabled", false);
				$(".buttonLoadingImage").addClass("hiddenButtonElement");
			    $(".buttonText").removeClass("hiddenButtonElement");
			},

			showSpinner(button) {
    			$(button).find(".buttonText").addClass("hiddenButtonElement");
    			$(button).find(".buttonLoadingImage").removeClass("hiddenButtonElement");
			}
		}
};