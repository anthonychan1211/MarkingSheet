const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const candidateNum = document.getElementById("candidate-number")
    const judgeNum = document.getElementById("judge-number")
    if(judgeNum.value < 3){
        alert('Number of Judge should be at least 3');
    } else{
        const submitButton = document.getElementById('submit');
        submitButton.style.display = 'none'
        let languagechange = document.getElementById("zh")
        languagechange.removeAttribute("href")
        //Create Grid Container
    const gridContainer = document.querySelector('.grid-container')
    //Create Judge Header
    const nameHeader = document.createElement('div')
    nameHeader.id = 'name-header'
    nameHeader.innerText = 'Name'
    gridContainer.appendChild(nameHeader);

    const markHeader = document.createElement('div')
    markHeader.id = 'mark-header'
    markHeader.innerText = 'Mark'
    gridContainer.appendChild(markHeader);

    //Create Row Content

    for(let i = 1; i <= candidateNum.value; i++){
        const candidateRow = document.createElement('div')
        candidateRow.className='candidate-row';
        const candidateNo = document.createElement('div')
        candidateNo.innerText = `Candidate ${i}`
        candidateNo.className = 'candidate-label';
        candidateRow.appendChild(candidateNo);

        const candidateName = document.createElement('input')
        candidateName.id = `candidateName${i}`
        candidateName.className = 'candidate-name';
        candidateRow.appendChild(candidateName);

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
        const final = document.createElement('div')
        final.id = `candidate${i}`
        final.className ='final-mark'
        gridContainer.appendChild(candidateRow);
        gridContainer.appendChild(final)
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
    let pressed = false;
    //Show Rank Function
    showRank.addEventListener('click', function(){
        if(pressed == false){
            const rankList = [];
           for(let i = 1 ; i <= candidateNum.value ; i++){
                let candidate = document.getElementById(`candidate${i}`)
                let canName = document.getElementById(`candidateName${i}`)
                console.log(candidate);
                let obj = {};
                obj['candidate'] = i;
                obj['candidateName'] = canName.value
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
          rankTable.id = 'rank-table';
          let headers = ['Rank', 'Candidate No.', 'Name', 'Mark'];
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
            let canNameCell = document.createElement('td');
            let canName = rankList[i-1]['candidateName'];
            let canNameTextNode = document.createTextNode(canName)
            console.log(canNameTextNode);
            canNameCell.appendChild(canNameTextNode);
            let markCell = document.createElement('td');
            let markTextNode = document.createTextNode(rankList[i-1]['mark']);
            markCell.appendChild(markTextNode);
            row.appendChild(rankCell);
            row.appendChild(canNumCell);
            row.appendChild(canNameCell);
            row.appendChild(markCell);
            rankTable.appendChild(row)
        }
        
        document.body.appendChild(rankTable)
        pressed = true
        return ;
        }
           if(pressed == true){
               const oldTable = document.getElementById('rank-table');
               oldTable.remove();
               const rankList = [];
           for(let i = 1 ; i <= candidateNum.value ; i++){
                let candidate = document.getElementById(`candidate${i}`)
                let canName = document.getElementById(`candidateName${i}`)
                console.log(candidate);
                let obj = {};
                obj['candidate'] = i;
                obj['candidateName'] = canName.value
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
          rankTable.id = 'rank-table';
          let headers = ['Rank', 'Candidate No.', 'Name', 'Mark'];
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
            let canNameCell = document.createElement('td');
            let canName = rankList[i-1]['candidateName'];
            let canNameTextNode = document.createTextNode(canName)
            console.log(canNameTextNode);
            canNameCell.appendChild(canNameTextNode);
            let markCell = document.createElement('td');
            let markTextNode = document.createTextNode(rankList[i-1]['mark']);
            markCell.appendChild(markTextNode);
            row.appendChild(rankCell);
            row.appendChild(canNumCell);
            row.appendChild(canNameCell);
            row.appendChild(markCell);
            rankTable.appendChild(row)
        }
        
        document.body.appendChild(rankTable)
        pressed = true
        return ;
           } 
        })
    
    }
    
});
  
