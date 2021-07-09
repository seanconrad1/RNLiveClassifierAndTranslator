//--------------------------------------------------------------
// Helper asynchronous function to invoke the Google Translation
// API and fetch the translated text. Excellent documentation
// for parameters and response data structure is here
// (Translating text (Basic)):
// https://cloud.google.com/translate/docs/basic/quickstart
//
// NOTE: Here we are using the simple GET with key model. While
// this is simple to implement, it is recommended to do a POST
// with an OAuth key to avoid key tampering. This approach is
// for instructional purposes ONLY.
//---------------------------------------------------------------
const GoogleTranslateAPI =
  "https://translation.googleapis.com/language/translate/v2";
const GoogleAPIKey = "";

export const getTranslation = async (className, language) => {
  try {
    const googleTranslateApiEndpoint = `${GoogleTranslateAPI}?q=${className}&target=${language}&format=html&source=en&model=nmt&key=${GoogleAPIKey}`;
    console.log(
      `Attempting to hit Google API Endpoint: ${googleTranslateApiEndpoint}`
    );

    let apiCall;

    try {
      apiCall = await fetch(googleTranslateApiEndpoint);
    } catch (err) {
      console.log("Line 133 error", err);
    }
    if (!apiCall) {
      console.error(`Google API did not respond adequately. Review API call.`);
      //throw new Error(`Google API did not respond.`);
      throw new Error(
        `Cannot get transaction at this time. Please try again later`
      );
    }

    //get JSON data
    let response = await apiCall.json();
    if (
      !response.data ||
      !response.data.translations ||
      response.data.translations.length === 0
    ) {
      console.error(
        `Google API unexpected response. Code: ${response.error.code} Message: ${response.error.message} Error: ${response.error.error}`
      );
    }

    // we only care about the first occurrence
    console.log(
      `Translated text is: ${response.data.translations[0].translatedText}`
    );
    return {
      word: className.split(",")[0],
      translation: response.data.translations[0].translatedText.split(",")[0],
    };
  } catch (error) {
    throw new Error(
      `Error while attempting to get translation from Google API. Error: ${error}`
    );
  }
};
