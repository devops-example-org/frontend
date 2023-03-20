export class Index {
  private readonly columns_ids: string =
    '["task_status", "task_priority", "task_epic"]';

  public name: string = "";
  public selectedStatus: string = "Ready to start";
  public statuses: string[];
  public selectedPriority: string = "Medium";
  public priorities: string[];
  public epics: string;
  public columns: [];
  public items: [];

  activate(_params: any, _routeConfig: any, _navigationInstruction: any) {
    let query = `query {
      boards (ids: [3870778277]) {
        name
        id
        items_count
        columns (ids: ${this.columns_ids}) {
          title
          settings_str
          type
        }
        items {
          name      
            column_values (ids: ${this.columns_ids}) {
              title
              text
            }     
        }
      }
    }`;

    this.executeQuery(query);
  }

  add() {
    if (!this.name) {
      alert("Please enter a name");
      return;
    }

    const query = `mutation { create_item (board_id: 3870778277, item_name: "${this.name}", column_values: "{\\"task_status\\": \\"${this.selectedStatus}\\"}") { 
      board {
        name
        id
         items_count,
        columns (ids: ${this.columns_ids}) {
          title
        }
        items {
          name      
           column_values (ids: ${this.columns_ids}) {
            title
            text
          }     
        }
      }     
     } }`;

    this.executeMutation(query);
  }

  private executeMutation(query: string) {
    fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.MONDAY_API_KEY,
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        this.items = res.data.create_item.board.items;
        this.name = this.selectedStatus = this.selectedPriority = this.epics = "";
      });
  }

  private executeQuery(query: string) {
    fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.MONDAY_API_KEY,
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        this.columns = res.data.boards[0].columns;
                
        for (let i = 0; i < res.data.boards[0].columns.length; i++) {
          const settings: string = res.data.boards[0].columns[i].settings_str;
          const labels: string[] = this.extractLabels(settings);

          if (res.data.boards[0].columns[i].title === "Status") {
            this.statuses = labels;
          }
          
          if (res.data.boards[0].columns[i].title === "Priority") {
            this.priorities = labels;
          }
        }         
        
        this.items = res.data.boards[0].items;
      });
  }

  private extractLabels(settings: string): string[] {
    if (!settings.includes('labels_positions_v2') && !settings.includes('labels')) {
      return [];
    }
    const settingsObj = JSON.parse(settings);
    const labels = Object.keys(settingsObj.labels);
    labels.sort((a, b) => {
      return (
        settingsObj.labels_positions_v2[a] - settingsObj.labels_positions_v2[b]
      );
    });
    return labels.map((label) => settingsObj.labels[label]);
  }
}
