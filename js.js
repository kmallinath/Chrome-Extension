window.onload = function () {
  const ulEl = document.getElementById("ul");
  console.log(ulEl);
  const d = document.getElementById("save");
  let myLeads = []
  let deleteEl = document.getElementById("delete")
  const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))

  let tabBtn = document.getElementById("tabs")

  if (leadsFromStorage) {
    myLeads = leadsFromStorage;
    render(myLeads)
  }


  function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
      //listItems +="<li><a target='_blank' href='"+myLeads[i]+"'>" + myLeads[i] + "</a></li>";
      listItems += `
    <li>
    <a target="_blank" href='${leads[i]}'>
    ${leads[i]}
    </a>
    </li>
    `

      // let ele=document.createElement("li")
      // ele.textContent+=(myLeads[i])
      // ulEl.append(ele)
    }
    ulEl.innerHTML = listItems;
    // localStorage.setItem("Name", "Mallinath")
    // console.log(localStorage.getItem("Name"))
  }


  tabBtn.addEventListener("click", function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      myLeads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myLeads))
      render(myLeads)
    })
  })



  deleteEl.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
  })


  //localStorage.setItem("myLeads","www.example.com")
  //console.log(localStorage.getItem("myLeads"))



  let inputEl = document.getElementById("inputEl")
  if (d) {
    d.addEventListener("click", function () {
      myLeads.push(inputEl.value);
      inputEl.value = ""
      localStorage.setItem("myLeads", JSON.stringify(myLeads))
      //myLeads=JSON.parse(myLeads)
      render(myLeads)
      //console.log(localStorage.getItem("myLeads"))
    });
  }



}
