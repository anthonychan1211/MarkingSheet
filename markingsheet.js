const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitButton = document.getElementById('submit');
    submitButton.style.display = 'none'
    const candidateNum = document.getElementById("candidate-number")
    const judgeNum = document.getElementById("judge-number")
    //Create Judge Header
    const markHeader = document.createElement('div')
    markHeader.id = 'mark-header'
    markHeader.innerText = 'Mark'
    document.body.appendChild(markHeader);
    //Create Row Content

    for(let i = 1; i <= candidateNum.value; i++){
        const candidateRow = document.createElement('div')
        candidateRow.className='candidate-row';
        const candidateNo = document.createElement('div')
        candidateNo.innerText = `Candidate ${i}`
        candidateNo.className = 'candidate-label';
        candidateRow.appendChild(candidateNo);
        for(let j = 1; j<= judgeNum.value; j++){
            const inputBox = document.createElement('input');
            inputBox.id = `${i}-${j}`;
            inputBox.className = 'mark-input'
            candidateRow.appendChild(inputBox);
        }
        const calculateButton = document.createElement('button');
        calculateButton.innerText = 'Calculate';
        calculateButton.type = 'submit';
        calculateButton.className = 'calculate-button';
        candidateRow.appendChild(calculateButton);
        const final = document.createElement('span')
        final.id = `candidate${i}`
        final.className ='final-mark'
        candidateRow.appendChild(final)
        document.body.appendChild(candidateRow);

         //Add calculate function

    calculateButton.addEventListener('click', function(e){
        e.preventDefault();
        const candidateMarks = [];
        for(let j = 1; j <= judgeNum.value; j++){
            const mark = document.getElementById(`${i}-${j}`);
            candidateMarks.push(mark.value);
        }
        candidateMarks.sort((a,b) => a-b);
        candidateMarks.pop()
        candidateMarks.shift();
        const numberVersion = candidateMarks.map(x => parseInt(x));
        const totalMark = numberVersion.reduce((a,b)=> a + b,0)
        const averageMark = totalMark / candidateMarks.length;
        const rounded = Math.round((averageMark + Number.EPSILON) * 100) / 100
        final.innerText = rounded;
    })

    }

    //Show Rank Button
    const showRank = document.createElement('button')
    showRank.id = 'rank-button'
    showRank.innerText = 'Rank';
    document.body.appendChild(showRank);
    const rankList = [];
    //Show Rank Function
    showRank.addEventListener('click', function(e){
        e.preventDefault();
       for(let i = 1 ; i <= candidateNum.value ; i++){
            let candidate = document.getElementById(`candidate${i}`)
            console.log(candidate);
            let obj = {};
            obj['candidate'] = i;
            obj['mark'] = candidate.innerText;
            rankList.push(obj)
       }

        rankList.sort(function (a, b) {
        return b.mark - a.mark;
      });
      for(let i = 1 ; i <= candidateNum.value ; i++){
          rankList[i-1]['Rank'] = i
      }
      console.log(rankList);
      
      //Create Rank Table

      const rankTable = document.createElement('table');
      let headers = ['Rank', 'Candidate', 'Mark'];
      let headerRow = document.createElement('tr')
      headers.forEach(header=> {
          let tableHeader = document.createElement('th');
          let textNode = document.createTextNode(header);
          tableHeader.appendChild(textNode); 
          headerRow.appendChild(tableHeader)
      })
      rankTable.appendChild(headerRow)
      
    for(let i = 1 ; i <= candidateNum.value ; i++){
        let row = document.createElement('tr');
        let rankCell = document.createElement('td');
        let rankTextNode = document.createTextNode(i);
        rankCell.appendChild(rankTextNode);
        let canNumCell = document.createElement('td');
        let canNumTextNode = document.createTextNode(`Candidate ${rankList[i-1]['candidate']}`);
        canNumCell.appendChild(canNumTextNode);
        let markCell = document.createElement('td');
        let markTextNode = document.createTextNode(rankList[i-1]['mark']);
        markCell.appendChild(markTextNode);
        row.appendChild(rankCell);
        row.appendChild(canNumCell);
        row.appendChild(markCell);
        rankTable.appendChild(row)
    }
    
    document.body.appendChild(rankTable)
    })

});
  
