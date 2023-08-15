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
            const lastEndpointResponse = await axios.get('https://statistics-app-cc50d2934119.herokuapp.com/last-called-endpoint');
            lastCalledEndpoint = lastEndpointResponse.data;
  
            const frequentServiceResponse = await axios.get('https://statistics-app-cc50d2934119.herokuapp.com/frequently-called-service');
            frequentlyCalledService = frequentServiceResponse.data.Frequently_Called_Service;
  
            const individualCallsResponse = await axios.get('https://statistics-app-cc50d2934119.herokuapp.com/number-of-indviduals-calls');
            individualCalls = individualCallsResponse.data.countOf_individuals_calls;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
  </script>
  
  <style>
    .card {
      background: #f9f9f9;
      border-radius: 5px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .title {
      border-bottom: 2px solid #ddd;
      margin-bottom: 15px;
      padding-bottom: 10px;
    }
  </style>
  
  <div class="container mt-5">
      <h2 class="mb-3">Statistics</h2>
  
      <!-- Last Called Endpoint Card -->
      <div class="card">
          <h4 class="title">Last Called Endpoint</h4>
          <p><strong>Service:</strong> {lastCalledEndpoint.service}</p>
          <p><strong>Endpoint:</strong> {lastCalledEndpoint.Last_Called_Endpoint}</p>
      </div>
  
      <!-- Frequently Called Service Card -->
      <div class="card">
          <h4 class="title">Frequently Called Service</h4>
          <p>{frequentlyCalledService}</p>
      </div>
  
      <!-- Number of Individual Calls Card -->
      <div class="card">
          <h4 class="title">Number of Individual Calls</h4>
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
  </div>