<script lang="ts">
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let dateFrom: string = '';
    let dateTo: string = '';
    let logs: any[] = [];
    let message: string = '';
  
    const handleGetLogs = (): void => {
      if (!dateFrom || !dateTo) {
        message = 'Select start and end dates.';
        return;
      }
  
      axios.get(`http://localhost:3066/logs/${dateFrom}/${dateTo}`)
        .then(response => {
          logs = response.data;
          if (logs.length === 0) {
            message = 'No logs for selected date range.';
          } else {
            message = '';
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            message = 'Invalid date range selected.';
          } else {
            message = 'Error fetching logs.';
          }
          console.error('Error fetching logs:', error);
        });
    };
  
    const handleDeleteLogs = (): void => {
      axios.delete('http://localhost:3066/logs')
        .then(response => {
          console.log(response.data);
          logs = [];
          message = 'Logs deleted.';
        })
        .catch(error => {
          console.error('Error deleting logs:', error);
          message = 'Error deleting logs.';
        });
    };
  
    const handleTransferLogs = (): void => {
      axios.post('http://localhost:3066/logs')
        .then(response => {
          console.log(response.data);
          message = "Logs transfered.";
        })
        .catch(error => {
          console.error('Error transferring logs:', error);
          message = 'Error transferring logs.';
        });
    };
  </script>


  <style>
    .date-input-group {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .button-group {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }
</style>

<div class="container mt-5">
    <h2 class="mb-4">Log Service</h2>
    <div class="date-input-group">
        <input bind:value={dateFrom} class="form-control" type="date" placeholder="Date from" />
        <input bind:value={dateTo} class="form-control" type="date" placeholder="Date to" />
    </div>
    <div class="button-group">
        <button class="btn btn-primary" on:click={handleGetLogs}>Get Logs</button>
        <button class="btn btn-danger" on:click={handleDeleteLogs}>Delete All Logs</button>
        <button class="btn btn-info" on:click={handleTransferLogs}>Transfer Logs</button>
    </div>
    {#if message}
      <p class="alert alert-info">{message}</p>
    {/if}
    {#if logs.length > 0}
      <table class="table mt-5">
        <thead>
          <tr>
            <th>Log</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {#each logs as log, index (index)}
            <tr>
              <td>{log.log}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
</div>