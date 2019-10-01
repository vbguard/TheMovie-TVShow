// export default function(currentPage, totalPage) {
//   const pagginationWrap = document.createElement("div");
//   const prevBtn = document.createElement("button");
//   prevBtn.textContent = "prev";
//   if (currentPage === 1) {
//     prevBtn.style.display = "none";
//   }
//   if (currentPage > 1) {
//     prevBtn.style.display = "inline-block";
//   }
//   const nextBtn = document.createElement("button");
//   nextBtn.textContent = "next";
//   const allPageBtn = [];

//   for (let i = 0; i < totalPage; i++) {
//     const pageBtn = document.createElement("button");
//     pageBtn.textContent = i + 1;

//     if (i + 1 === currentPage) {
//       pageBtn.className = "pag-btn-active";
//     }

//     allPageBtn.push(pageBtn);
//   }

//   const getTenPages = () => {
//     const maxItem = 10;
//     return allPageBtn.slice(0, maxItem);
//   };

//   pagginationWrap.insertAdjacentElement("beforeend", prevBtn);
//   pagginationWrap.append(...getTenPages());
//   pagginationWrap.insertAdjacentElement("beforeend", nextBtn);
//   // () = (),(),(),() = ()
//   return pagginationWrap;
// }

const Pagination = {
  code: "",
  // converting initialize data
  Extend: function(data) {
    data = data || {};
    Pagination.size = data.size || 300;
    Pagination.page = data.page || 1;
    Pagination.step = data.step || 3;
  },
  // add pages by number (from [s] to [f])
  Add: function(s, f) {
    for (let i = s; i < f; i++) {
      Pagination.code += "<a>" + i + "</a>";
    }
  },
  // add last page with separator
  Last: function() {
    Pagination.code += "<i>...</i><a>" + Pagination.size + "</a>";
  },
  // add first page with separator
  First: function() {
    Pagination.code += "<a>1</a><i>...</i>";
  },
  // change page
  Click: function() {
    Pagination.page = +this.innerHTML;
    Pagination.Start();
  },
  // previous page
  Prev: function() {
    Pagination.page--;
    if (Pagination.page < 1) {
      Pagination.page = 1;
    }
    Pagination.Start();
  },
  // next page
  Next: function() {
    Pagination.page++;
    if (Pagination.page > Pagination.size) {
      Pagination.page = Pagination.size;
    }
    Pagination.Start();
  },
  // binding pages
  Bind: function() {
    var a = Pagination.e.getElementsByTagName("a");
    for (var i = 0; i < a.length; i++) {
      if (+a[i].innerHTML === Pagination.page) a[i].className = "current";
      a[i].addEventListener("click", Pagination.Click, false);
    }
  },
  // write pagination
  Finish: function() {
    Pagination.e.innerHTML = Pagination.code;
    Pagination.code = "";
    Pagination.Bind();
  },
  // find pagination type
  Start: function() {
    if (Pagination.size < Pagination.step * 2 + 6) {
      Pagination.Add(1, Pagination.size + 1);
    } else if (Pagination.page < Pagination.step * 2 + 1) {
      Pagination.Add(1, Pagination.step * 2 + 4);
      Pagination.Last();
    } else if (Pagination.page > Pagination.size - Pagination.step * 2) {
      Pagination.First();
      Pagination.Add(
        Pagination.size - Pagination.step * 2 - 2,
        Pagination.size + 1
      );
    } else {
      Pagination.First();
      Pagination.Add(
        Pagination.page - Pagination.step,
        Pagination.page + Pagination.step + 1
      );
      Pagination.Last();
    }
    Pagination.Finish();
  },
  // binding buttons
  Buttons: function(e) {
    var nav = e.getElementsByTagName("a");
    nav[0].addEventListener("click", Pagination.Prev, false);
    nav[1].addEventListener("click", Pagination.Next, false);
  },
  // create skeleton
  Create: function(e) {
    const html = [
      "<a>&#9668;</a>", // previous button
      "<span></span>", // pagination container
      "<a>&#9658;</a>" // next button
    ];
    e.innerHTML = html.join("");
    Pagination.e = e.getElementsByTagName("span")[0];
    Pagination.Buttons(e);
  },
  // init
  Init: function(e, data) {
    Pagination.Extend(data);
    Pagination.Create(e);
    Pagination.Start();
  }
};

const init = function(node, data) {
  Pagination.Init(node, data);
};

export default init;
