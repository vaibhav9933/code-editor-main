const JAVA_KEY = "62";
const CPP_KEY = "53";
const PYTHON_KEY = "70";
const BASE_URL = "http://localhost:5000";

let currentLanguageId = PYTHON_KEY;
let editor;

function codeEditor(lang_id) {
  if (!editor) {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
  }

  currentLanguageId = lang_id;
  console.log("Language changed to: " + lang_id);
  
  // Remove old click handlers first
  $("button").off('click');
  
  // Set up new button click handler
  $("button").on("click", function (e) {
    e.preventDefault();
    console.log("✅ Execute button clicked!");
    
    let code = editor.getValue();
    console.log("Code to execute:", code);
    
    let language = "";
    if (currentLanguageId == PYTHON_KEY) language = "python";
    else if (currentLanguageId == JAVA_KEY) language = "javascript";
    else if (currentLanguageId == CPP_KEY) language = "javascript";
    
    console.log("Selected language:", language);
    
    let data = {
      language: language,
      code: code,
      input: ""
    };
    
    console.log("🚀 Sending request to:", BASE_URL + "/execute");
    console.log("📦 Request data:", data);
    
    $("#ans").html("Loading...");
    
    $.ajax({
      url: BASE_URL + "/execute",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function(response) {
        console.log("✅ Success! Response:", response);
        let output = response.output || response.errors || "No output";
        $("#ans").html(output);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error("❌ Error:", textStatus, errorThrown);
        console.error("Response text:", jqXHR.responseText);
        console.error("Status code:", jqXHR.status);
        $("#ans").html("Error: " + textStatus + " - " + errorThrown);
      }
    });
  });
  
  console.log("✅ Button click handler registered");
  
  // Set default code for selected language
  if(lang_id==PYTHON_KEY)
      editor.setValue("def execute(): \n\t for i in range(10):\n\t\t print(i) \nexecute()")
  //java
  if(lang_id==JAVA_KEY){

      let javacode = `public class Main{
  public static void main(String args[]){
    System.out.println("hello");
  }
}
`;

  editor.setValue(javacode)

  }if(lang_id==CPP_KEY){
      let cppcode = `#include <iostream>
using namespace std;
  int main() {
      cout<<"Hello World"; \n
}`
      editor.setValue(cppcode)
  }


} 
