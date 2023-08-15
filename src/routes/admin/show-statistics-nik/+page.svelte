<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';

  interface LastCalledEndpointType {
    service?: string;
    Last_Called_Endpoint?: string;
  }
  
  interface IndividualCallsType {
    [service: string]: {
      [endpoint: string]: number;
    }
  }

  let lastCalledEndpoint: LastCalledEndpointType = {};
  let frequentlyCalledService: string = '';
  let individualCalls: IndividualCallsType = {};

  onMount(async () => {
      try {
          const lastEndpointResponse = await axios.get('https://statistics-jeb4.onrender.com/last-called-endpoint');
          lastCalledEndpoint = lastEndpointResponse.data;

          const frequentServiceResponse = await axios.get('https://statistics-jeb4.onrender.com/frequently-called-service');
          frequentlyCalledService = frequentServiceResponse.data.Frequently_Called_Service;

          const individualCallsResponse = await axios.get('https://statistics-jeb4.onrender.com/number-of-indviduals-calls');
          individualCalls = individualCallsResponse.data.countOf_individuals_calls;
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  });
</script>

<div class="container mt-5">
  <h2 class="mb-3">Statistics</h2>
  
  <h4>Last Called Endpoint</h4>
  <p>Service: {lastCalledEndpoint.service}</p>
  <p>Endpoint: {lastCalledEndpoint.Last_Called_Endpoint}</p>

  <h4>Frequently Called Service</h4>
  <p>{frequentlyCalledService}</p>

  <h4>Number of Individual Calls</h4>
  <table class="table">
      <thead>
          <tr>
              <th>Service</th>
              <th>Endpoint</th>
              <th>Calls Count</th>
          </tr>
      </thead>
      <tbody>
          {#each Object.entries(individualCalls) as [service, endpoints] (service)}
              {#each Object.entries(endpoints) as [endpoint, count] (`${service}-${endpoint}`)}
                  <tr>
                      <td>{service}</td>
                      <td>{endpoint}</td>
                      <td>{count}</td>
                  </tr>
              {/each}
          {/each}
      </tbody>
  </table>
</div>
