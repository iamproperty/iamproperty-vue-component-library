<template>
  <main>
    <DSHeader :image="headerImg" section="components">
      <h1>Action bar</h1>
    </DSHeader>

    <div class="container">
      <p class="lead">Action bars serve as a central hub for users to access and perform actions within an interface.</p>
      <h2>Introduction</h2>
      <p>Action bars are a useful component that can be integrated with other existing components, allowing users to eciently perform actions on one or multiple items simultaneously. Action bars emphasise clarity by presenting a concise set of actions, ensuring that the most important and frequently used actions are prominently displayed.</p>
      <p>Defined by it's compact design and responsive overflow options, the micro-component rich action bar is viable in already busy interfaces and on smaller screens.</p>
    
      <h2>Anatomy</h2>
      <img :src="anatomy" class="mb-3" />
      <ol class="mb-5">
        <li>Default state container</li>
        <li>Select box  (optional)</li>
        <li>Filter/Sort by (optional)</li>
        <li>Secondary compact button (optional)</li>
        <li>Primary button  (optional)</li>
        <li>Selected state container (if a Select box is added, the selected state container will appear when one or more items are selected)</li>
        <li>Action button group</li>
      </ol>
    </div>


    <div class="container visualtest">

      <h3>Components that can be used in the Action bar</h3>

      <div class="row">

        <div class="col-12 col-sm-6 col-md-3">
          <button class="btn btn-primary btn-sm fa-plus mb-3">Lorem ipsum</button>
          <p>Primary button small</p>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <button class="btn btn-primary btn-sm fa-plus btn-compact mb-3">Lorem ipsum</button>
          <p>Primary button small (compact)</p>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <button class="btn btn-secondary btn-sm mb-3">Lorem ipsum</button>
          <p>Secondary button small</p>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <button class="btn btn-secondary btn-sm btn-compact fa-plus mb-3">Lorem ipsum</button>
          <p>Secondary button small compact</p> 
        </div>


        <div class="col-12 col-sm-6 col-md-3">
          <button class="btn btn-action fa-edit mb-2">Edit</button>
          <p>Action button</p>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <button class="btn btn-action fa-edit btn-compact mb-2">Edit</button>
          <p>Action button (compact)</p>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="dialog__wrapper">
            <button class="btn btn-action mb-2 me-0">Quick filter</button>
            <dialog class="dialog--list">
              <div class="mb-0">
                <input type="radio" name="sort" data-sort="" id="follow-up-oldest" value="follow-up-oldest">
                <label for="follow-up-oldest" class="radio--tick">Follow up date (Oldest to newest)</label>
                <hr>
                <input type="radio" name="sort" data-sort="" id="follow-up-newest" value="follow-up-newest">
                <label for="follow-up-newest" class="radio--tick">Follow up date (Newest to oldest)</label>
                <hr>
                <input type="radio" name="sort" data-sort="" id="date-instructed-oldest" value="date-instructed-oldest" checked="" autofocus="true">
                <label for="date-instructed-oldest" class="radio--tick">Date Instructed (Oldest to newest)</label>
                <hr>
                <input type="radio" name="sort" data-sort="" id="date-instructed-newest" value="date-instructed-newest">
                <label for="date-instructed-newest" class="radio--tick mb-0">Date Instructed (Newest to oldest)</label>
              </div>
            </dialog>
          </div>

          <p>Quick filter action bar button</p>
        </div>
        <div class="col-12 col-sm-6 col-md-3">

          <div class="views mb-1">
            <button class="btn btn-action btn-compact fa-regular fa-grid-2 me-1">square</button>
            <button class="btn btn-action btn-compact fa-regular fa-grip-lines me-1">list</button>
            <button class="btn btn-action btn-compact fa-regular fa-bars me-1">small</button>
          </div>

          <p>Grid/List/Small list</p>
        </div>





        <div class="col-12 col-sm-6 col-md-3">
          <span class="actionbar__text mb-1">4 tenanies found</span>
          <p>Text count</p>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <button class="btn btn-secondary btn-sm btn-compact fa-search">Search</button>
          <p>Search bar (secondary compact button)</p>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="search-wrapper mb-1">
            <label for="search" class="visually-hidden">Input field label</label>
            <button class="suffix"><i class="fa-regular fa-search"></i></button>
            <input type="text" id="search" name="search" required="">
          </div>
          <p>Search bar expanded</p>
        </div>
        
      </div>
      <h4>Overflow menu options</h4>
      
      <div class="container visualtest">
        
        <PopoverLists></PopoverLists>
      </div>



    </div>


    <div class="container pb-0">
      <h2>Behaviours</h2>
      <h3>Adaptive displays</h3>
    </div>


    <div class="container visualtest">
      <div class="demo" >

        <div class="row">
          <div class="col-12 pb-5">
                
            <Actionbar data-selectall data-search style="position: relative; z-index: 103;">
              <div class="dialog__wrapper">
                <button class="btn btn-action mb-0 me-0">Quick filter</button>
                <dialog class="dialog--list">
                  <div class="pb-0">
                    <input type="radio" name="sorta" data-sort="" id="follow-up-oldesta" value="follow-up-oldest">
                    <label for="follow-up-oldesta" class="radio--tick">Option 1</label>

                    <input type="radio" name="sorta" data-sort="" id="follow-up-newesta" value="follow-up-newest">
                    <label for="follow-up-newesta" class="radio--tick">Option 2</label>

                    <input type="radio" name="sorta" data-sort="" id="date-instructed-oldesta" value="date-instructed-oldest" checked="" autofocus="true">
                    <label for="date-instructed-oldesta" class="radio--tick">Option 3</label>
   
                    <input type="radio" name="sorta" data-sort="" id="date-instructed-newesta" value="date-instructed-newest">
                    <label for="date-instructed-newesta" class="radio--tick mb-0">Option 4</label>
                  </div>
                </dialog>
              </div>

              <button class="btn btn-primary btn-sm fa-plus" id="uploadBtn">Upload document</button>

              <button class="btn btn-action fa-pen-to-square" data-single slot="selected">Edit</button>
              <button class="btn btn-action fa-box-archive" slot="selected">Archive</button>
              <button class="btn btn-action fa-trash-can" slot="selected">Delete</button>
              <hr slot="selected" />
              <button class="btn btn-action" slot="selected" data-cancel>Cancel</button>

            </Actionbar>
          </div>
        </div>

        <div class="row">
          <div class="d-none d-md-block col-12 pb-5">
                
            <Actionbar data-selectall data-search style="max-width: 48em;position: relative;  z-index: 102;">
              <div class="dialog__wrapper">
                <button class="btn btn-action mb-0 me-0">Quick filter</button>
                <dialog class="dialog--list">
                  <div class="pb-0">
                    <input type="radio" name="sortb" data-sort="" id="follow-up-oldestb" value="follow-up-oldest">
                    <label for="follow-up-oldestb" class="radio--tick">Option 1</label>

                    <input type="radio" name="sortb" data-sort="" id="follow-up-newestb" value="follow-up-newest">
                    <label for="follow-up-newestb" class="radio--tick">Option 2</label>

                    <input type="radio" name="sortb" data-sort="" id="date-instructed-oldestb" value="date-instructed-oldest" checked="" autofocus="true">
                    <label for="date-instructed-oldestb" class="radio--tick">Option 3</label>
   
                    <input type="radio" name="sortb" data-sort="" id="date-instructed-newestb" value="date-instructed-newest">
                    <label for="date-instructed-newestb" class="radio--tick mb-0">Option 4</label>
                  </div>
                </dialog>
              </div>


              <button class="btn btn-primary btn-sm fa-plus" id="uploadBtn">Upload document</button>

              <button class="btn btn-action fa-pen-to-square" data-single slot="selected">Edit</button>
              <button class="btn btn-action fa-box-archive" slot="selected">Archive</button>
              <button class="btn btn-action fa-trash-can" slot="selected">Delete</button>
              <hr slot="selected" />
              <button class="btn btn-action" slot="selected" data-cancel>Cancel</button>

            </Actionbar>
          </div>
        </div>

        <div class="row">
          <div class="d-none d-md-block col-12">
                
            <Actionbar data-selectall data-search style="max-width: 23.4375em;position: relative; z-index: 101;">
              <div class="dialog__wrapper">
                <button class="btn btn-action mb-0 me-0">Quick filter</button>
                <dialog class="dialog--list">
                  <div class="pb-0">
                    <input type="radio" name="sortc" data-sort="" id="follow-up-oldestc" value="follow-up-oldest">
                    <label for="follow-up-oldestc" class="radio--tick">Option 1</label>

                    <input type="radio" name="sortc" data-sort="" id="follow-up-newestc" value="follow-up-newest">
                    <label for="follow-up-newestc" class="radio--tick">Option 2</label>

                    <input type="radio" name="sortc" data-sort="" id="date-instructed-oldestc" value="date-instructed-oldest" checked="" autofocus="true">
                    <label for="date-instructed-oldestc" class="radio--tick">Option 3</label>
   
                    <input type="radio" name="sortc" data-sort="" id="date-instructed-newestc" value="date-instructed-newest">
                    <label for="date-instructed-newestc" class="radio--tick mb-0">Option 4</label>
                  </div>
                </dialog>
              </div>

              <button class="btn btn-primary btn-sm fa-plus" id="uploadBtn">Upload document</button>

              <button class="btn btn-action fa-pen-to-square" data-single slot="selected">Edit</button>
              <button class="btn btn-action fa-box-archive" slot="selected">Archive</button>
              <button class="btn btn-action fa-trash-can" slot="selected">Delete</button>
              <hr slot="selected" />
              <button class="btn btn-action" slot="selected" data-cancel>Cancel</button>

            </Actionbar>
          </div>
        </div>

      </div>
    </div>
    <div class="container pb-0">
      <h3 class="pt-5">Dispatched events</h3>
      <p>The actionbar component will dispatch events for other components like tables to listen to creating interactive UI's.</p>
    </div>
    <div class="container visualtest">
      <div class="demo">
        <Actionbar data-selectall data-search id="dispatch">
          <div class="dialog__wrapper">
            <button class="btn btn-action mb-0 me-0">Quick filter</button>
            <dialog class="dialog--list">
              <div class="pb-0">
                <input type="radio" name="sortd" data-sort="" id="follow-up-oldestd" value="follow-up-oldest">
                <label for="follow-up-oldestd" class="radio--tick">Option 1</label>

                <input type="radio" name="sortd" data-sort="" id="follow-up-newestd" value="follow-up-newest">
                <label for="follow-up-newestd" class="radio--tick">Option 2</label>

                <input type="radio" name="sortd" data-sort="" id="date-instructed-oldestd" value="date-instructed-oldest" checked="" autofocus="true">
                <label for="date-instructed-oldestd" class="radio--tick">Option 3</label>

                <input type="radio" name="sortd" data-sort="" id="date-instructed-newestd" value="date-instructed-newest">
                <label for="date-instructed-newestd" class="radio--tick mb-0">Option 4</label>
              </div>
            </dialog>
          </div>

          <button class="btn btn-primary btn-sm fa-plus" id="uploadBtn">Upload document</button>

          <button class="btn btn-action fa-pen-to-square" data-single slot="selected">Edit</button>
          <button class="btn btn-action fa-box-archive" slot="selected">Archive</button>
          <button class="btn btn-action fa-trash-can" slot="selected">Delete</button>
          <hr slot="selected" />
          <button class="btn btn-action" slot="selected" data-cancel>Cancel</button>

        </Actionbar>
      </div>
      <pre><code id="dispatchedEvents"></code></pre>
    </div>

    <div class="container pb-0">
      <h3>States</h3>
      <p>The Action bar has three states: Default, Selected and Search.</p>
      <p>Default is the initial (and possibly only, depending on use) state the Action bar takes. Defined by it’s lighter background, it’s a responsive container that houses buttons and actions that affect the elements its linked to globally, e.g., filtering a table, sorting a list by newest to oldest, etc. </p>
      <p>The Default state may not have the ‘Select all’ checkbox on the left, it could have other components or be empty on the left. It’s down to the utility and required functions needed.</p>
    </div>
    <div class="container visualtest">
      <div class="demo mb-5">
        <Actionbar data-selectall data-search>
          <div class="dialog__wrapper">
            <button class="btn btn-action mb-0 me-0">Quick filter</button>
            <dialog class="dialog--list">
              <div class="pb-0">
                <input type="radio" name="sorte" data-sort="" id="follow-up-oldeste" value="follow-up-oldest">
                <label for="follow-up-oldeste" class="radio--tick">Option 1</label>

                <input type="radio" name="sorte" data-sort="" id="follow-up-neweste" value="follow-up-newest">
                <label for="follow-up-neweste" class="radio--tick">Option 2</label>

                <input type="radio" name="sorte" data-sort="" id="date-instructed-oldeste" value="date-instructed-oldest" checked="" autofocus="true">
                <label for="date-instructed-oldeste" class="radio--tick">Option 3</label>

                <input type="radio" name="sorte" data-sort="" id="date-instructed-neweste" value="date-instructed-newest">
                <label for="date-instructed-neweste" class="radio--tick mb-0">Option 4</label>
              </div>
            </dialog>
          </div>

          <button class="btn btn-primary btn-sm fa-plus" id="uploadBtn">Upload document</button>

          <button class="btn btn-action fa-pen-to-square" data-single slot="selected">Edit</button>
          <button class="btn btn-action fa-box-archive" slot="selected">Archive</button>
          <button class="btn btn-action fa-trash-can" slot="selected">Delete</button>
          <hr slot="selected" />
          <button class="btn btn-action" slot="selected" data-cancel>Cancel</button>

        </Actionbar>
      </div>
    </div>
    <div class="container pb-0">
      <p>Selected is a secondary state, it only appears when the user selects an item linked to the Action bar, overlapping the Default state and presenting a list of actions relevant to the selected item(s). There are Individual and Batch actions:</p>

      <p><strong>Individual actions:</strong> These are actions that only change a single item. They are disabled when two or more items are selected, e.g. ‘Edit’.</p>
      <p><strong>Batch actions:</strong> These are actions that can be done ‘in batch’. The user can selected as many items as they want and apply a batch action to them and change them simultaneously, e.g. ‘Delete’, ‘Undo’, ‘Archive’.</p>

      <p>Dismissal: The Select state will be dismissed either when the user completes an action and it is no longer needed, or when the user deselects all linked items. In both cases, the Selected state will be hidden and return to the Default state.</p>
    </div>
    <div class="container visualtest ">
      <div class="demo mb-5">
        <Actionbar data-selectall data-selected="1" data-search class="mb-4">
          <div class="dialog__wrapper">
            <button class="btn btn-action mb-0 me-0">Quick filter</button>
            <dialog class="dialog--list">
              <div class="pb-0">
                <input type="radio" name="sortf" data-sort="" id="follow-up-oldestf" value="follow-up-oldest">
                <label for="follow-up-oldestf" class="radio--tick">Option 1</label>

                <input type="radio" name="sortf" data-sort="" id="follow-up-newestf" value="follow-up-newest">
                <label for="follow-up-newestf" class="radio--tick">Option 2</label>

                <input type="radio" name="sortf" data-sort="" id="date-instructed-oldestf" value="date-instructed-oldest" checked="" autofocus="true">
                <label for="date-instructed-oldestf" class="radio--tick">Option 3</label>

                <input type="radio" name="sortf" data-sort="" id="date-instructed-newestf" value="date-instructed-newest">
                <label for="date-instructed-newestf" class="radio--tick mb-0">Option 4</label>
              </div>
            </dialog>
          </div>

          <button class="btn btn-primary btn-sm fa-plus" id="uploadBtn">Upload document</button>

          <button class="btn btn-action fa-pen-to-square" data-single slot="selected">Edit</button>
          <button class="btn btn-action fa-box-archive" slot="selected">Archive</button>
          <button class="btn btn-action fa-trash-can" slot="selected">Delete</button>
          <hr slot="selected" />
          <button class="btn btn-action" slot="selected" data-cancel>Cancel</button>

        </Actionbar>
        <Actionbar data-selectall data-selected="6" data-search class="mb-5">
          <div class="dialog__wrapper">
            <button class="btn btn-action mb-0 me-0">Quick filter</button>
            <dialog class="dialog--list">
              <div class="pb-0">
                <input type="radio" name="sorth" data-sort="" id="follow-up-oldesth" value="follow-up-oldest">
                <label for="follow-up-oldesth" class="radio--tick">Option 1</label>

                <input type="radio" name="sorth" data-sort="" id="follow-up-newesth" value="follow-up-newest">
                <label for="follow-up-newesth" class="radio--tick">Option 2</label>

                <input type="radio" name="sorth" data-sort="" id="date-instructed-oldesth" value="date-instructed-oldest" checked="" autofocus="true">
                <label for="date-instructed-oldesth" class="radio--tick">Option 3</label>

                <input type="radio" name="sorth" data-sort="" id="date-instructed-newesth" value="date-instructed-newest">
                <label for="date-instructed-newesth" class="radio--tick mb-0">Option 4</label>
              </div>
            </dialog>
          </div>

          <button class="btn btn-primary btn-sm fa-plus" id="uploadBtn">Upload document</button>

          <button class="btn btn-action fa-pen-to-square" data-single slot="selected">Edit</button>
          <button class="btn btn-action fa-box-archive" slot="selected">Archive</button>
          <button class="btn btn-action fa-trash-can" slot="selected">Delete</button>
          <hr slot="selected" />
          <button class="btn btn-action" slot="selected" data-cancel="">Cancel</button>

        </Actionbar>
        <Table class="table--cta table--fullwidth">

        <Actionbar data-selectall data-selected="1" data-search slot="before">

          <div class="dialog__wrapper">
            <button class="btn btn-action mb-0 me-0">Quick filter</button>
            <dialog class="dialog--list">
              <div class="pb-0 mb-0">
                <input type="radio" name="sort" data-sort="" id="follow-up-oldest" value="follow-up-oldest">
                <label for="follow-up-oldest" class="radio--tick">Follow up date (Oldest to newest)</label>

                <input type="radio" name="sort" data-sort="" id="follow-up-newest" value="follow-up-newest">
                <label for="follow-up-newest" class="radio--tick">Follow up date (Newest to oldest)</label>

                <input type="radio" name="sort" data-sort="" id="date-instructed-oldest" value="date-instructed-oldest" checked="" autofocus="true">
                <label for="date-instructed-oldest" class="radio--tick">Date Instructed (Oldest to newest)</label>

                <input type="radio" name="sort" data-sort="" id="date-instructed-newest" value="date-instructed-newest">
                <label for="date-instructed-newest" class="radio--tick mb-0">Date Instructed (Newest to oldest)</label>
              </div>
            </dialog>
          </div>
          
          <button class="btn btn-primary btn-sm fa-plus" id="uploadBtn">Upload document</button>

          <button class="btn btn-action fa-pen-to-square"  data-single>Edit</button>
          <button class="btn btn-action fa-box-archive" >Archive</button>
          <button class="btn btn-action fa-trash-can" >Delete</button>
          <hr />
          <button class="btn btn-action" >Cancel</button>

        </Actionbar>

        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Date added</th>
              <th>Lorum ipsum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tom Smith</td>
              <td>10.05.23</td>
              <td>Lorum ipsum</td>
              <td data-label=""><a href="/" class="text-nowrap">Manage client</a></td>
            </tr>
            <tr data-selected>
              <td>Tom Smith</td>
              <td>10.05.23</td>
              <td>Lorum ipsum</td>
              <td data-label=""><a href="/" class="text-nowrap">Manage client</a></td>
            </tr>
            <tr>
              <td>Tom Smith</td>
              <td>10.05.23</td>
              <td>Lorum ipsum</td>
              <td data-label=""><a href="/" class="text-nowrap">Manage client</a></td>
            </tr>
            <tr>
              <td>Tom Smith</td>
              <td>10.05.23</td>
              <td>Lorum ipsum</td>
              <td data-label=""><a href="/" class="text-nowrap">Manage client</a></td>
            </tr>
            <tr>
              <td>Tom Smith</td>
              <td>10.05.23</td>
              <td>Lorum ipsum</td>
              <td data-label=""><a href="/" class="text-nowrap">Manage client</a></td>
            </tr>
          </tbody>
        </table>
        </Table>
      </div>
    </div>

    <p class="note mb-5"><strong>Note:</strong> Individual input fields can be given the checked attribute on page load, you may still need to add the data-selected attribute to the Actionbar component with the number of checked fields. In the case of a table that generates the input fields a data-selected attrbiute is needed on the table rwo element.</p>


    <div class="container pb-0">
      <p>Search is a secondary state, it only appears when the user clicks the ‘search’ icon, overlapping the Default state and presenting an input field. </p>
      <p>Dismissal: On Desktop and Tablet, you can exit the Search state by pressing the ‘X’ icon or anywhere on the page outside the search bar. On Mobile, You can exit the Search state by pressing anywhere on the page outside the search bar. When dismissed, the Search state will be hidden and return to the Default state.</p>
    </div>
    <div class="container visualtest">
      <div class="demo mb-5">
        <Actionbar data-selectall data-search="show">
          <div class="dialog__wrapper">
            <button class="btn btn-action mb-0 me-0">Quick filter</button>
            <dialog class="dialog--list">
              <div class="pb-0">
                <input type="radio" name="sorti" data-sort="" id="follow-up-oldesti" value="follow-up-oldest">
                <label for="follow-up-oldesti" class="radio--tick">Option 1</label>

                <input type="radio" name="sorti" data-sort="" id="follow-up-newesti" value="follow-up-newest">
                <label for="follow-up-newesti" class="radio--tick">Option 2</label>

                <input type="radio" name="sorti" data-sort="" id="date-instructed-oldesti" value="date-instructed-oldest" checked="" autofocus="true">
                <label for="date-instructed-oldesti" class="radio--tick">Option 3</label>

                <input type="radio" name="sorti" data-sort="" id="date-instructed-newesti" value="date-instructed-newest">
                <label for="date-instructed-newesti" class="radio--tick mb-0">Option 4</label>
              </div>
            </dialog>
          </div>

          <button class="btn btn-primary btn-sm fa-plus" id="uploadBtn">Upload document</button>

          <button class="btn btn-action fa-pen-to-square" data-single slot="selected">Edit</button>
          <button class="btn btn-action fa-box-archive" slot="selected">Archive</button>
          <button class="btn btn-action fa-trash-can" slot="selected">Delete</button>
          <hr slot="selected" />
          <button class="btn btn-action" slot="selected" data-cancel>Cancel</button>

        </Actionbar>
      </div>
    </div>


    <div class="container visualtest">

      <h4>Switch views</h4>

      <div class="demo">
        <Actionbar data-switchviews="square,list,small" data-view="square" id="switch">

          <button class="btn btn-action fa-pen-to-square">Edit</button>
          <button class="btn btn-action fa-box-archive">Archive</button>
          <button class="btn btn-action fa-trash-can">Delete</button>

          <button class="btn btn-primary btn-sm fa-plus" id="uploadBtn">Upload document</button>
        </Actionbar>

        <div data-view="square">
          Square view
        </div>
        <div data-view="list">
          List view
        </div>
        <div data-view="small">
          Small view
        </div>
      </div>
      <pre><code id="dispatchedEvents2"></code></pre>
    </div>

    <!-- Waiting for the completion of FEG-129 -->
    <div class="container pt-5">
      <h3>Selected state: active area</h3>
      <p>The active area around the select box in the default state is kept tight around the select box. Users must directly click on the select box to trigger the Selected state. Other elements sharing the same container in the item can be interacted with, e.g. an ‘Open link’ button in a card or a text link within a table row.</p>
      <p>When the user selects an item from the linked list, the active area expands to cover a larger area, making it quicker and easier to select and deselect individual items. Users can click on anywhere within the expanded active area to select/deselect that item. Other elements sharing the same container in the item can no longer interacted with until the Selected state returns to default and the active area on each of the list items shrinks to their default size.</p>

      <div class="row mb-5 text-center">

        <div class="col-16 col-sm-6">
          <img :src="tablelist" class="mb-3" />
          <p>Table list: Active area around select box, default state</p>
        </div>
        <div class="col-16 col-sm-6">
          <img :src="tablelistExpanded" class="mb-3" />
          <p>Table list: Expanded active area around select box, selected state</p>
        </div>
        <div class="col-16 col-sm-6">
          <img :src="cardList" class="mb-3" />
          <p>Card list: Active area around select box, default state</p>
        </div>
        <div class="col-16 col-sm-6">
          <img :src="cardListExpanded" class="mb-3" />
          <p>Card list: Expanded active area around select box, selected state</p>
        </div>

      </div>

    </div>
    


    <div class="container">
      <h3>Examples of use</h3>
      <p>The Action bar is a flexible component that can be used in a broad range of applications and context. With optional components within the Action bar that can be swapped in and out - depending on need - making the Action bar adjustable. Some examples of potential use are displayed below.</p>

      <p>Action bars can be used inline next to other content or also full width taking up the entire space.</p>

      <div class="row mb-5 text-center">

        <div class="col-16 col-sm-6">
          <img :src="intable" class="mb-3" />
          <p><a href="/examples/actionbar-table" target="_blank">Add to tables</a></p>
        </div>
        <div class="col-16 col-sm-6">
          <img :src="adminpanel" class="mb-3" />
          <p><a href="/examples/actionbar-panel" target="_blank">Add to admin panel</a></p>
        </div>
        <div class="col-16 col-sm-6">
          <img :src="attop" class="mb-3" />
          <p><a href="/examples/actionbar-top" target="_blank">Add to top of page</a></p>
        </div>

      </div>

    </div>


    <div class="container">
      <h3>Mobile behaviour</h3>
      <p>On mobile devices, the action bar collapses to save screen space, condensed into a few key buttons or icons or with an overflow menu with listed actions. To accommodate the mobile table rows or list elements, it becomes sticky and follows the user down the page to ensure action options are always available to the user.</p>

      <div class="row mb-5 text-center">

        <div class="col-16 col-sm-6">
          <img :src="mobile" class="mb-3" />
          <p>Mobile Action bar </p>
        </div>
        <div class="col-16 col-sm-6">
          <img :src="mobileSticky" class="mb-3" />
          <p>Mobile Action bar - sticky</p>
        </div>
        
      </div>

    </div>

    <div class="container">
      <h3>Overflow</h3>
      <p>Overflow menus are user interface elements that provide a space-efficient way to present additional actions and options that do not fit within the primary interface. Actions within an overflow menu are organised hierarchically or based on categories to enhance user comprehension.</p>

      <p>Overflow helps manage actions and maintain a clean user interface while ensuring that users have access to a comprehensive set of options when needed.</p>

      <img :src="overflow" class="mb-3" />
      <p>Default: When sizing down, the secondary button acts as overflow and actions are grouped together</p>

      <img :src="responsive" class="mb-3" />
      <p>Responsive: When sizing down across breakpoints, the ActionBar.List will size accordingly</p>
  
      <img :src="overflowMobile" class="mb-3" />
      <p >Mobile: Action buttons are made more compact by hiding the text and relying on an icon to convey their meaning and what they do. The ActionBar.List can contain up to three compact action icons. Any more will by added to the overflow menu</p>
    
    </div>

    <div class="container">
      <h3>Layout</h3>
      <p>Action bars can be used inline next to other content, added to the top of existing components or also at the top of a page and linked to a range of content below it.</p>
      <p>There are two containers in the Action bar, the container to the right (ActionBar.List) has special qualities - see section on Overflow. The ActionBar.List has an alignment to the right. When elements are added to, removed or put into an overflow menu, all the elements within will continue to align right.</p>

      <div class="row mb-5">

        <div class="col-16 col-sm-6">
          <img :src="layoutDo" class="mb-3" />
          <span class="h4 text-complete pb-1">Do</span>
          <p>Align all elements to the right.</p>
        </div>

        <div class="col-16 col-sm-6">
          <img :src="layoutDont" class="mb-3" />
          <span class="h4 text-danger pb-1">Don't</span>
          <p>Change the alignment, group order or spacing of the elements.</p>
        </div>


        <div class="col-16 col-sm-6">
          <img :src="layoutDo2" class="mb-3" />
          <span class="h4 text-complete pb-1">Do</span>
          <p>Follow group order. Primary buttons and Secondary buttons are grouped, Action buttons and Quick Filter/Sorts are grouped.</p>
        </div>

        <div class="col-16 col-sm-6">
          <img :src="layoutDont2" class="mb-3" />
          <span class="h4 text-danger pb-1">Don't</span>
          <p>Don’t throw elements in and break the group order. Also, the overflow Secondary button should always be closest to the Action button group.</p>
        </div>


      </div>

    </div>



    <div class="container">
      
      <h2>Implementation</h2>
      <Tabs>
        <details>
          <summary><h3>Web component</h3></summary>
          
        </details>
        <details>
          <summary><h3>Vue component</h3></summary>
          
        </details>
        <!--
        <details>
          <summary><h3>HTML</h3></summary>
          <pre><code class="javascript">{{`<div class="container"></div>`}}</code></pre>
        </details>
      -->
      </Tabs>

    </div>
    <div class="bg-light version-control">
      <div class="container">
        <table>
          <thead>
            <tr>
              <th>Version Control</th>
              <th>Date</th>
              <th>Design System Version</th>
              <th>Notable updates</th>
            </tr>
          </thead>
          <tbody class="text-body">
            <tr>
              <td>V1 added</td>
              <td>23.08.2023</td>
              <td>v3.7.10</td>
              <td>N/A</td>
            </tr>
          </tbody>
        </table>
        <a href="/pdfs/actionbar.pdf" download>Download latest designs</a>
      </div>
    </div>

  </main>
</template>

<style lang="scss" scoped>
@use "../../../assets/sass/func" as *;

#dispatchedEvents,
#dispatchedEvents2 {
  max-height: 10rem;

}

.demo + pre {

  margin-left: -1.5rem;
  margin-right: -1.5rem;
  
  @include container-up(sm) {

    margin-left: 0rem;
    margin-right: 0rem;
  }
}

.demo {
  background-color: #F2F2F2;
  padding: 3rem 1.5rem;

  margin-left: -1.5rem;
  margin-right: -1.5rem;
  
  @include container-up(sm) {

    margin-left: 0rem;
    margin-right: 0rem;
  }
}

div[data-view] {
  padding: 2rem 1rem;
  background: #FCFCFC;
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
}

@layer utilities {
.views {

  .btn-action:not(:last-child){
    margin-right: 0.25rem!important;
  }
}
}

.search-wrapper {
  width: calc(100% - #{rem(44 + 8)});
  max-width: rem(350)!important;
  margin: 0;

  @include container-up(md) {

    max-width: rem(450)!important;
  }

  input {
    padding-top: rem(8);
    padding-bottom: rem(8);

    min-height: rem(40)!important;
    max-height: rem(40)!important;
  }

  :is(.prefix,.suffix) {
    
    padding: rem(8)!important;
    min-height: rem(40)!important;
    max-height: rem(40)!important;
    min-width: rem(40)!important;
    max-width: rem(40)!important;
    line-height: rem(40 - 8 - 8)!important;
  }
}

</style>

<script>
import DSHeader from '../DSHeader.vue'
import headerImg from '../../img/cards-header.png'
import Tabs from '@/components/Tabs/Tabs.vue'
import Table from '@/components/Table/Table.vue'

// Component - Replace the card references to new component
import Actionbar from '@/components/Actionbar/Actionbar.vue'
import Card from '@/components/Card/Card.vue'

import anatomy from '../../img/actionbar/actionbar-anatomy.png'
import tablelist from '../../img/actionbar/actionbar-tablelist.png'
import tablelistExpanded from '../../img/actionbar/actionbar-tablelist-expanded.png'
import cardList from '../../img/actionbar/actionbar-card-list.png'
import cardListExpanded from '../../img/actionbar/actionbar-card-list-expanded.png'

import attop from '../../img/actionbar/actionbar-top.png'
import adminpanel from '../../img/actionbar/actionbar-adminpanel.png'
import intable from '../../img/actionbar/actionbar-table.png'

import mobile from '../../img/actionbar/actionbar-mobile.png'
import mobileSticky from '../../img/actionbar/actionbar-mobile-sticky.png'


import overflow from '../../img/actionbar/actionbar-overflow.png'
import overflowMobile from '../../img/actionbar/actionbar-overflow-mobile.png'
import responsive from '../../img/actionbar/actionbar-responsive.png'


import layoutDo from '../../img/actionbar/actionbar-do.png'
import layoutDont from '../../img/actionbar/actionbar-dont.png'
import layoutDo2 from '../../img/actionbar/actionbar-do2.png'
import layoutDont2 from '../../img/actionbar/actionbar-dont2.png'

import PopoverLists from '../popoverLists.vue'


export default {
  components: {
    DSHeader,
    headerImg,
    Tabs,
    Table,
    Actionbar,
    Card,
    anatomy,
    PopoverLists,
    tablelist,
    tablelistExpanded,
    cardList,
    cardListExpanded,
    attop,
    adminpanel,
    intable,
    mobile,
    mobileSticky,
    overflow,
    responsive,
    overflowMobile,
    layoutDo,
    layoutDont,
    layoutDo2,
    layoutDont2
  },
  data () {
    return {
      headerImg: headerImg,
      anatomy:anatomy,
      tablelist: tablelist,
      tablelistExpanded: tablelistExpanded,
      cardList: cardList,
      cardListExpanded: cardListExpanded,
      attop: attop,
      adminpanel: adminpanel,
      intable: intable,
      mobile: mobile,
      mobileSticky: mobileSticky,
      overflow: overflow,
      responsive:responsive,
      overflowMobile:overflowMobile,
      layoutDo:layoutDo,
      layoutDont:layoutDont,
      layoutDo2:layoutDo2,
      layoutDont2:layoutDont2
    }
  },
  mounted() {
    this.$nextTick(function () {

      let uploadBtn = document.getElementById('uploadBtn');


      uploadBtn.addEventListener('click', (event) => {

        alert('Trigger an upload function, this will be done as seperate JS.')
      });



      let actionbar = document.querySelector('#dispatch');
      let dispatchedEvents = document.querySelector('#dispatchedEvents');
      let events = ['search-keyup','search-change','search-submit','selected'];
      
      events.forEach((eventType ,index) => {
          
        actionbar.addEventListener(eventType, event => {
          
          dispatchedEvents.innerHTML += `${eventType}: ${JSON.stringify(event.detail)}\n`;
          dispatchedEvents.scrollTop = dispatchedEvents.scrollHeight;
        });
      });

        
            

      let actionbar2 = document.querySelector('#switch');
      let dispatchedEvents2 = document.querySelector('#dispatchedEvents2');
      let events2 = ['switch-view'];
      
      events2.forEach((eventType ,index) => {
          
        actionbar2.addEventListener(eventType, event => {
          
          dispatchedEvents2.innerHTML += `${eventType}: ${JSON.stringify(event.detail)}\n`;
          dispatchedEvents2.scrollTop = dispatchedEvents2.scrollHeight;
        });
      });

        
            
          
      


    })
  }
}
</script>