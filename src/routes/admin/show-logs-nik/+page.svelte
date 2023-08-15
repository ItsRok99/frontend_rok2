<script lang="ts">
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let dateFrom: string = '';
    let dateTo: string = '';
    let logs: any[] = [];
    let message: string = '';
  
    const handleGetLogs = (): void => {
      if (!dateFrom || !dateTo) {
        message = 'Please select both start and end dates.';
        return;
      }
  
      axios.get(`http://localhost:3001/logs/${dateFrom}/${dateTo}`)
        .then(response => {
          logs = response.data;
          if (logs.length === 0) {
            message = 'No logs found for the selected date range.';
          } else {
            message = '';
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            message = 'Invalid date range selected. Please try again.';
          } else {
            message = 'Error fetching logs. Please try again.';
          }
          console.error('Error fetching logs:', error);
        });
    };
  
    const handleDeleteLogs = (): void => {
      axios.delete('http://localhost:3001/logs')
        .then(response => {
          console.log(response.data);
          logs = [];
          message = 'Logs deleted successfully.';
        })
        .catch(error => {
          console.error('Error deleting logs:', error);
          message = 'Error deleting logs. Please try again.';
        });
    };
  
    const handleTransferLogs = (): void => {
      axios.post('http://localhost:3001/logs')
        .then(response => {
          console.log(response.data);
          message = "Logs transfer has started. Please wait a few moments and then fetch the logs to see the updated data.";
        })
        .catch(error => {
          console.error('Error transferring logs:', error);
          message = 'Error transferring logs. Please try again.';
        });
    };
  </script>
  <div class="container mt-5">
    <h2 class="mb-3">Log Service Dashboard</h2>
    <div>
      <input bind:value={dateFrom} type="date" placeholder="Date from" />
      <input bind:value={dateTo} type="date" placeholder="Date to" />
      <button on:click={handleGetLogs}>Get Logs</button>
      <button on:click={handleDeleteLogs}>Delete All Logs</button>
      <button on:click={handleTransferLogs}>Transfer Logs</button>
    </div>
    {#if message}
      <p>{message}</p>
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
  